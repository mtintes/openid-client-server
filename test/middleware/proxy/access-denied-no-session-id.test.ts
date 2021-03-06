import * as util from '../../../src/middleware/util'

import {IncomingMessage, ServerResponse} from 'http'
import sinon, {stubInterface} from 'ts-sinon'

import {Client} from 'openid-client'
import {Logger} from 'pino'
import {MemorySessionStore} from '../../../src/session'
import {UrlWithParsedQuery} from 'url'
import {createContext} from '../../../src/context'
import {proxyMiddleware} from '../../../src/middleware/proxy-middleware'
import test from 'ava'

const sendJsonResponseStub = sinon.stub(util, 'sendJsonResponse')

test('proxyMiddlware should throw access denied when no session id is present', async t => {
    const clientStub = stubInterface<Client>()
    const store = new MemorySessionStore()
    const host = 'http://unit-test:0000'
    const pathname = '/unit-test-proxy'
    const excludeCookie = false
    const useIdToken = false

    const proxy = proxyMiddleware({
        host,
        pathname,
        excludeCookie,
        useIdToken,
        sessionStore: store,
        client: clientStub
    })

    const reqStub = stubInterface<IncomingMessage>()
    const resStub = stubInterface<ServerResponse>()
    const urlStub = stubInterface<UrlWithParsedQuery>()
    const loggerStub = stubInterface<Logger>()
    urlStub.pathname = pathname

    let ctx = createContext(reqStub, resStub, urlStub, loggerStub)

    ctx = await proxy(ctx)

    t.true(ctx.done)
    t.true(sendJsonResponseStub.calledOnce)
    sendJsonResponseStub.reset()
})
