import * as util from '../../../src/middleware/util'

import {Client, IdTokenClaims, TokenSet} from 'openid-client'
import {IncomingMessage, ServerResponse} from 'http'
import sinon, {stubInterface} from 'ts-sinon'

import {Logger} from 'pino'
import {MemorySessionStore} from '../../../src/session'
import {UrlWithParsedQuery} from 'url'
import {createContext} from '../../../src/context'
import {proxyMiddleware} from '../../../src/middleware/proxy-middleware'
import test from 'ava'

const executeRequestStub = sinon.stub(util, 'executeRequest')

test('proxyMiddlware should refresh token when expired and execute request', async t => {
    const clientStub = stubInterface<Client>()
    const idTokenClaimsStub = stubInterface<IdTokenClaims>()
    const store = new MemorySessionStore()
    const testHost = 'http://unit-test:0000'
    const testPathname = '/unit-test-proxy'
    const testExcludeCookie = false
    const testUseIdToken = false
    const testRefreshToken = 'test-refresh-token'
    const testAccessToken = 'test-access-token'
    const testMethod = 'GET'

    const tokenSet: TokenSet = {
        claims: () => idTokenClaimsStub,
        access_token: testAccessToken,
        refresh_token: testRefreshToken,
        expired: () => false
    }

    clientStub.refresh.resolves(tokenSet)

    const proxy = proxyMiddleware({
        host: testHost,
        pathname: testPathname,
        excludeCookie: testExcludeCookie,
        useIdToken: testUseIdToken,
        sessionStore: store,
        client: clientStub
    })

    const reqStub = stubInterface<IncomingMessage>()
    const resStub = stubInterface<ServerResponse>()
    const urlStub = stubInterface<UrlWithParsedQuery>()
    const loggerStub = stubInterface<Logger>()
    urlStub.pathname = testPathname

    const testSessionId = 'asdfington'
    let testCtx = createContext(reqStub, resStub, urlStub, loggerStub)
    testCtx.sessionId = testSessionId

    reqStub.method = testMethod

    const expiredStub = sinon.stub()
    expiredStub.returns(true)

    const tokenSetExpired: TokenSet = {
        claims: () => idTokenClaimsStub,
        access_token: undefined,
        refresh_token: testRefreshToken,
        expired: expiredStub
    }

    const storeSetStub = sinon.stub(store, 'set')
    const storeGetStub = sinon.stub(store, 'get')

    storeGetStub.resolves({
        sessionId: testSessionId,
        createdAt: Date.now(),
        csrfString: null,
        codeVerifier: null,
        tokenSet: tokenSetExpired,
        userInfo: null,
        sessionState: null,
        fromUrl: null,
        securedPathFromUrl: null
    })

    testCtx = await proxy(testCtx)

    t.true(testCtx.done)
    t.true(expiredStub.calledOnce)
    t.true(storeSetStub.calledOnce)
    t.true(storeGetStub.calledOnce)
    t.true(executeRequestStub.calledOnce)
    t.is(executeRequestStub.args[0][0].token, testAccessToken)
    t.is(executeRequestStub.args[0][0].excludeCookie, testExcludeCookie)
    t.is(executeRequestStub.args[0][0].host, testHost)
    t.is(executeRequestStub.args[0][0].pathname, testPathname)
    t.is(executeRequestStub.args[0][0].ctx, testCtx)
    t.is(executeRequestStub.args[0][0].method, testMethod)
    executeRequestStub.reset()
})
