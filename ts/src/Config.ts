
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'CainiaoTracking',
        slug: "cainiao-tracking",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://global.cainiao.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      tracking: {
      },

    }
  }


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
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

