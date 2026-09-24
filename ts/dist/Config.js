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
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
                    "title": "Dest Country",
                    "type": "`$STRING`",
                    "short": "Destination country code"
                },
                {
                    "name": "latestTrackingInfo",
                    "title": "Latest Tracking Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "mailNo",
                    "title": "Mail No",
                    "type": "`$STRING`",
                    "short": "The tracking number of the shipment"
                },
                {
                    "name": "originCountry",
                    "title": "Origin Country",
                    "type": "`$STRING`",
                    "short": "Origin country code"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Current status of the shipment"
                },
                {
                    "name": "statusDescription",
                    "title": "Status Description",
                    "type": "`$STRING`",
                    "short": "Detailed description of the current status"
                },
                {
                    "name": "trackingList",
                    "title": "Tracking List",
                    "type": "`$ARRAY`",
                    "short": "Complete tracking history"
                }
            ],
            "name": "tracking",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "global",
                                "detail.json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "lang",
                                        "orig": "lang",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "en-US"
                                    },
                                    {
                                        "name": "language",
                                        "orig": "language",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "en-US"
                                    },
                                    {
                                        "name": "mail_no",
                                        "orig": "mail_no",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "ZH363796677HK"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "lang",
                                    "language",
                                    "mail_no"
                                ]
                            }
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