

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CainiaoTrackingSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TrackingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAINIAO_TRACKING_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAINIAO_TRACKING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CainiaoTrackingSDK.test()
    const ent = testsdk.Tracking()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CainiaoTrackingSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Tracking().load({"lang":1,"mail_no":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAINIAO_TRACKING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tracking.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$OBJECT`","key$":"data","index$":0},"errorCode":{"a":true,"h":"Error Code","n":"errorCode","r":false,"sh":"Error code if applicable","t":"`$STRING`","key$":"errorCode","index$":1},"errorMsg":{"a":true,"h":"Error Msg","n":"errorMsg","r":false,"sh":"Error message if applicable","t":"`$STRING`","key$":"errorMsg","index$":2},"success":{"a":true,"h":"Success","n":"success","r":false,"sh":"Indicates if the request was successful","t":"`$BOOLEAN`","key$":"success","index$":3}},"name":"tracking","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /global/detail.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"en-US","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"en-US","k":"query","n":"language","or":"language","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"ZH363796677HK","k":"query","n":"mail_no","or":"mailNos","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/global/detail.json","q":{"exist":["mail_no"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"global"},{"lit":"detail.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"tracking","name__orig":"tracking","Name":"Tracking","name_":"tracking","name-":"tracking","NAME":"TRACKING","index$":0}, {"active":true,"entity":"tracking","key$":"BasicTrackingFlow","kind":"basic","name":"BasicTrackingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"tracking_ref01","srcdatavar":"tracking_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tracking_ref01"}}],"index$":0}]}, 'Tracking', {"GET /global/detail.json":{"protocol":"http","parameters":[{"name":"mailNos","in":"query","description":"Tracking number(s) for the shipment(s). Multiple tracking numbers can be provided separated by commas.","required":true,"schema":{"type":"string"},"example":"ZH363796677HK","index$":0},{"name":"lang","in":"query","description":"Language code for the response (e.g., en-US, zh-CN, fr-FR)","required":false,"schema":{"type":"string","default":"en-US"},"example":"en-US","index$":1},{"name":"language","in":"query","description":"Alternative language parameter for response localization","required":false,"schema":{"type":"string","default":"en-US"},"example":"en-US","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tracking_ref01_data = Object.values(setup.data.existing.tracking)[0] as any

    // LOAD
    const tracking_ref01_ent = client.Tracking()
    const tracking_ref01_match_dt0: any = {}
    const tracking_ref01_data_dt0 = (await tracking_ref01_ent.load(tracking_ref01_match_dt0)).data()
    assert(null != tracking_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/tracking/TrackingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CainiaoTrackingSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['tracking01','tracking02','tracking03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAINIAO_TRACKING_TEST_TRACKING_ENTID': idmap,
    'CAINIAO_TRACKING_TEST_LIVE': 'FALSE',
    'CAINIAO_TRACKING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CAINIAO_TRACKING_TEST_TRACKING_ENTID']

  const live = 'TRUE' === env.CAINIAO_TRACKING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAINIAO_TRACKING_TEST_TRACKING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CainiaoTrackingSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
