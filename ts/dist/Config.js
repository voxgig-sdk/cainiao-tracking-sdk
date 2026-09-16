"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'CainiaoTracking',
        slug: "cainiao-tracking",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://global.cainiao.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            tracking: {},
        }
    };
    entity = {
        "tracking": {
            "fields": [
                {
                    "name": "destCountry",
                    "short": "Destination country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "latestTrackingInfo",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "mailNo",
                    "short": "The tracking number of the shipment",
                    "type": "`$STRING`"
                },
                {
                    "name": "originCountry",
                    "short": "Origin country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "short": "Current status of the shipment",
                    "type": "`$STRING`"
                },
                {
                    "name": "statusDescription",
                    "short": "Detailed description of the current status",
                    "type": "`$STRING`"
                },
                {
                    "name": "trackingList",
                    "short": "Complete tracking history",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "tracking",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "en-US",
                                        "kind": "query",
                                        "name": "lang",
                                        "orig": "lang",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "en-US",
                                        "kind": "query",
                                        "name": "language",
                                        "orig": "language",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "ZH363796677HK",
                                        "kind": "query",
                                        "name": "mail_no",
                                        "orig": "mail_no",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/global/detail.json",
                            "segments": [
                                {
                                    "lit": "global"
                                },
                                {
                                    "lit": "detail.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "lang",
                                    "language",
                                    "mail_no"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "global",
                                "detail.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map