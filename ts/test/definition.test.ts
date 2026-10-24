import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "tracking",
    "accessor": "Tracking",
    "op": "load",
    "method": "GET",
    "path": "/global/detail.json",
    "args": [],
    "select": {
      "mail_no": "v1",
      "lang": "en-US",
      "language": "en-US"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "mailNos",
      "lang",
      "language"
    ],
    "queryArgs": [
      {
        "name": "lang",
        "wire": "lang"
      },
      {
        "name": "language",
        "wire": "language"
      },
      {
        "name": "mail_no",
        "wire": "mailNos"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "success": true,
      "data": {
        "mailNo": "ZH363796677HK",
        "status": "DELIVERED",
        "statusDescription": "Package delivered successfully",
        "latestTrackingInfo": {
          "time": "2024-01-15T10:30:00Z",
          "desc": "Delivered",
          "location": "New York, US"
        },
        "trackingList": [
          {
            "time": "2024-01-15T10:30:00Z",
            "desc": "Delivered",
            "location": "New York, US",
            "status": "DELIVERED"
          },
          {
            "time": "2024-01-14T08:00:00Z",
            "desc": "Out for delivery",
            "location": "New York, US",
            "status": "IN_TRANSIT"
          }
        ],
        "destCountry": "US",
        "originCountry": "CN"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
