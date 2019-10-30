var func131 = function (t) {
    t.exports = {
        _from: "elliptic@^6.0.0",
        _id: "elliptic@6.4.0",
        _inBundle: !1,
        _integrity: "sha1-ysmvh2LIWDYYcAPI3+GT5eLq5d8=",
        _location: "/node-libs-browser/elliptic",
        _phantomChildren: {},
        _requested: {
            type: "range",
            registry: !0,
            raw: "elliptic@^6.0.0",
            name: "elliptic",
            escapedName: "elliptic",
            rawSpec: "^6.0.0",
            saveSpec: null,
            fetchSpec: "^6.0.0"
        },
        _requiredBy: ["/node-libs-browser/browserify-sign", "/node-libs-browser/create-ecdh"],
        _resolved: "https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz",
        _shasum: "cac9af8762c85836187003c8dfe193e5e2eae5df",
        _spec: "elliptic@^6.0.0",
        _where: "C:\\Users\\Jacky\\AppData\\Roaming\\npm\\node_modules\\node-libs-browser\\node_modules\\browserify-sign",
        author: {name: "Fedor Indutny", email: "fedor@indutny.com"},
        bugs: {url: "https://github.com/indutny/elliptic/issues"},
        bundleDependencies: !1,
        dependencies: {
            "bn.js": "^4.4.0",
            brorand: "^1.0.1",
            "hash.js": "^1.0.0",
            "hmac-drbg": "^1.0.0",
            inherits: "^2.0.1",
            "minimalistic-assert": "^1.0.0",
            "minimalistic-crypto-utils": "^1.0.0"
        },
        deprecated: !1,
        description: "EC cryptography",
        devDependencies: {
            brfs: "^1.4.3",
            coveralls: "^2.11.3",
            grunt: "^0.4.5",
            "grunt-browserify": "^5.0.0",
            "grunt-cli": "^1.2.0",
            "grunt-contrib-connect": "^1.0.0",
            "grunt-contrib-copy": "^1.0.0",
            "grunt-contrib-uglify": "^1.0.1",
            "grunt-mocha-istanbul": "^3.0.1",
            "grunt-saucelabs": "^8.6.2",
            istanbul: "^0.4.2",
            jscs: "^2.9.0",
            jshint: "^2.6.0",
            mocha: "^2.1.0"
        },
        files: ["lib"],
        homepage: "https://github.com/indutny/elliptic",
        keywords: ["EC", "Elliptic", "curve", "Cryptography"],
        license: "MIT",
        main: "lib/elliptic.js",
        name: "elliptic",
        repository: {type: "git", url: "git+ssh://git@github.com/indutny/elliptic.git"},
        scripts: {
            jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
            jshint: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
            lint: "npm run jscs && npm run jshint",
            test: "npm run lint && npm run unit",
            unit: "istanbul test _mocha --reporter=spec test/index.js",
            version: "grunt dist && git add dist/"
        },
        version: "6.4.0"
    }
}