<p>
    <h2 align="center">openid-client-server</h2>
</p>

<p align="center">
    An OpenId Relying Party (RP, Client) application server.
</p>

<p align="center">
    <a href="https://openid.net/">
        <img src=".github/assets/oidc-client-server.svg" title="openid" width="100%" />
    </a>
</p>

<p align="center">
    This module leverages the <a href="https://www.npmjs.com/package/openid-client">openid-client</a> module to implement a web server that secures any Web UI framework that can be hosted by <a href="https://nodejs.org/en/">Node.js</a> with Authorization Code Flow (optional <a href="https://tools.ietf.org/html/rfc7636">Proof Key</a>), Implicit Flow or Hybrid Flow. The module also provides configurable proxy endpoints that include the user token automatically in requests to API endpoints, as well a session management making it easier to create Web UI's that are "secure by default".
</p>

<p align="center">
    <a href="https://www.typescriptlang.org/">
        <img src="https://badgen.net/badge/icon/typescript?icon=typescript&label" title="Built with TypeScript" />
    </a>
    <a href="https://github.com/xojs/xo">
        <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" title="XO code style" />
    </a>
</p>

## Install

with npm

```console
$ npm install @optum/openid-client-server
```

with yarn

```console
$ yarn add @ooptum/openid-client-server
```

## Usage

### Options

The `resolveOptions` function will leverage environmental variables to auto-build all options with defaults. It can be required in the server setup module via `import {resolveOptions} from '@optum/openid-client-server`.

> For more info see the [.env.example](.env.example) file

### RequestListener

Use the `createRequestListener` function to create a `http` module RequestListener. It can be required in the server setup module via `import {createRequestListener} from '@optum/openid-client-server`.

> For more info see the [examples](examples) folder

## Background

The original goal of this module was to provide as easy way to implement OpenID flows with [Next.js](https://nextjs.org/) applications via a [custom Next.js](https://nextjs.org/docs/advanced-features/custom-server) server. There were issues leveraging frameworks like [Koa.js](https://koajs.com/) for "easy wins" in session management and out-of-the-box middleware, so tides turned to using Node's core [`http`](https://nodejs.org/api/http.html) module. The result ended up working for any Web UI that could be served by Node.js, so here we are.

## Development

### Environment

<p>
  <ul>
    <li>
        Node.js is required to develop this module. Please install the latest <a href="https://nodejs.org/en/">LTS</a> version if you haven't already.
    </li>
    <li>
        Module dependencies are managed with Yarn. Please install it if you haven't already.
        <pre>$ npm i -g yarn</pre>
    </li>
  </ul>
</p>

### Editors

**VS Code**

> extensions

-   [Linter for XO](https://marketplace.visualstudio.com/items?itemName=samverschueren.linter-xo)
-   [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [VSC Sort Import](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports)

> settings.json

```json
{
    "xo.enable": true,
    "xo.format.enable": true,
    "javascript.format.enable": false,
    "javascript.validate.enable": false,
    "prettier.tabWidth": 4,
    "prettier.singleQuote": true,
    "editor.formatOnSave": true,
    "sort-imports.on-save": true,
    "sort-imports.cache-package-json-config-checks": true,
    "[typescriptreact]": {
        "editor.defaultFormatter": "samverschueren.linter-xo"
    },
    "[typescript]": {
        "editor.defaultFormatter": "samverschueren.linter-xo"
    },
    "[javascript]": {
        "editor.defaultFormatter": "samverschueren.linter-xo"
    },
    "[json]": {
        "editor.defaultFormatter": "euskadi31.json-pretty-printer"
    }
}
```
