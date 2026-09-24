"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TrackingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAINIAO_TRACKING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAINIAO_TRACKING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CainiaoTrackingSDK.test();
        const ent = testsdk.Tracking();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAINIAO_TRACKING_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'tracking.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "destCountry": { "a": true, "h": "Dest Country", "n": "destCountry", "r": false, "sh": "Destination country code", "t": "`$STRING`", "key$": "destCountry", "index$": 0 }, "latestTrackingInfo": { "a": true, "h": "Latest Tracking Info", "n": "latestTrackingInfo", "r": false, "t": "`$OBJECT`", "key$": "latestTrackingInfo", "index$": 1 }, "mailNo": { "a": true, "h": "Mail No", "n": "mailNo", "r": false, "sh": "The tracking number of the shipment", "t": "`$STRING`", "key$": "mailNo", "index$": 2 }, "originCountry": { "a": true, "h": "Origin Country", "n": "originCountry", "r": false, "sh": "Origin country code", "t": "`$STRING`", "key$": "originCountry", "index$": 3 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Current status of the shipment", "t": "`$STRING`", "key$": "status", "index$": 4 }, "statusDescription": { "a": true, "h": "Status Description", "n": "statusDescription", "r": false, "sh": "Detailed description of the current status", "t": "`$STRING`", "key$": "statusDescription", "index$": 5 }, "trackingList": { "a": true, "h": "Tracking List", "n": "trackingList", "r": false, "sh": "Complete tracking history", "t": "`$ARRAY`", "key$": "trackingList", "index$": 6 } }, "name": "tracking", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /global/detail.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "en-US", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "en-US", "k": "query", "n": "language", "or": "language", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "ZH363796677HK", "k": "query", "n": "mail_no", "or": "mail_no", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/global/detail.json", "q": { "exist": ["lang", "language", "mail_no"] }, "r": {}, "s": [{ "lit": "global" }, { "lit": "detail.json" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "tracking", "name__orig": "tracking", "Name": "Tracking", "name_": "tracking", "name-": "tracking", "NAME": "TRACKING", "index$": 0 }, { "active": true, "entity": "tracking", "key$": "BasicTrackingFlow", "kind": "basic", "name": "BasicTrackingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "tracking_ref01", "srcdatavar": "tracking_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-tracking_ref01" } }], "index$": 0 }] }, 'Tracking', { "GET /global/detail.json": { "protocol": "http", "operationId": "getTrackingDetail", "responses": { "200": { "description": "Successful response with tracking details", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "description": "Indicates if the request was successful", "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "destCountry": { "description": "Destination country code", "type": "string", "key$": "destCountry" }, "latestTrackingInfo": { "properties": { "desc": { "description": "Description of the latest tracking event", "type": "string" }, "location": { "description": "Location of the latest tracking event", "type": "string" }, "time": { "description": "Timestamp of the latest tracking event", "format": "date-time", "type": "string" } }, "type": "object", "key$": "latestTrackingInfo" }, "mailNo": { "description": "The tracking number of the shipment", "type": "string", "key$": "mailNo" }, "originCountry": { "description": "Origin country code", "type": "string", "key$": "originCountry" }, "status": { "description": "Current status of the shipment", "type": "string", "key$": "status" }, "statusDescription": { "description": "Detailed description of the current status", "type": "string", "key$": "statusDescription" }, "trackingList": { "description": "Complete tracking history", "items": { "properties": { "desc": { "description": "Description of the tracking event", "type": "string" }, "location": { "description": "Location of the tracking event", "type": "string" }, "status": { "description": "Status at this tracking point", "type": "string" }, "time": { "description": "Timestamp of the tracking event", "format": "date-time", "type": "string" } }, "type": "object" }, "type": "array", "key$": "trackingList" } }, "type": "object", "index$": 0 }, "errorCode": { "description": "Error code if applicable", "key$": "errorCode", "type": "string" }, "errorMsg": { "description": "Error message if applicable", "key$": "errorMsg", "type": "string" } } }, "example": { "success": true, "data": { "mailNo": "ZH363796677HK", "status": "DELIVERED", "statusDescription": "Package delivered successfully", "latestTrackingInfo": { "time": "2024-01-15T10:30:00Z", "desc": "Delivered", "location": "New York, US" }, "trackingList": [{ "time": "2024-01-15T10:30:00Z", "desc": "Delivered", "location": "New York, US", "status": "DELIVERED" }, { "time": "2024-01-14T08:00:00Z", "desc": "Out for delivery", "location": "New York, US", "status": "IN_TRANSIT" }], "destCountry": "US", "originCountry": "CN" } } } } }, "400": { "description": "Bad request - Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "errorCode": { "type": "string", "example": "INVALID_PARAMETER" }, "errorMsg": { "type": "string", "example": "Invalid tracking number format" } } } } } }, "404": { "description": "Tracking number not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "errorCode": { "type": "string", "example": "NOT_FOUND" }, "errorMsg": { "type": "string", "example": "Tracking number not found in system" } } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "errorCode": { "type": "string", "example": "INTERNAL_ERROR" }, "errorMsg": { "type": "string", "example": "An internal error occurred" } } } } } } }, "parameters": [{ "name": "mailNos", "in": "query", "description": "Tracking number(s) for the shipment(s). Multiple tracking numbers can be provided separated by commas.", "required": true, "schema": { "type": "string" }, "example": "ZH363796677HK", "index$": 0 }, { "name": "lang", "in": "query", "description": "Language code for the response (e.g., en-US, zh-CN, fr-FR)", "required": false, "schema": { "type": "string", "default": "en-US" }, "example": "en-US", "index$": 1 }, { "name": "language", "in": "query", "description": "Alternative language parameter for response localization", "required": false, "schema": { "type": "string", "default": "en-US" }, "example": "en-US", "index$": 2 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let tracking_ref01_data = Object.values(setup.data.existing.tracking)[0];
        // LOAD
        const tracking_ref01_ent = client.Tracking();
        const tracking_ref01_match_dt0 = {};
        const tracking_ref01_data_dt0 = (await tracking_ref01_ent.load(tracking_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != tracking_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/tracking/TrackingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CainiaoTrackingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['tracking01', 'tracking02', 'tracking03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAINIAO_TRACKING_TEST_TRACKING_ENTID': idmap,
        'CAINIAO_TRACKING_TEST_LIVE': 'FALSE',
        'CAINIAO_TRACKING_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CAINIAO_TRACKING_TEST_TRACKING_ENTID'];
    const live = 'TRUE' === env.CAINIAO_TRACKING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAINIAO_TRACKING_TEST_TRACKING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CainiaoTrackingSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CAINIAO_TRACKING_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TrackingEntity.test.js.map