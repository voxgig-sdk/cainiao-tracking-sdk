
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'CainiaoTracking',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "latestTrackingInfo",
          "type": "`$OBJECT`"
        },
        {
          "name": "mailNo",
          "type": "`$STRING`"
        },
        {
          "name": "originCountry",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "statusDescription",
          "type": "`$STRING`"
        },
        {
          "name": "trackingList",
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
              "parts": [
                "global",
                "detail.json"
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
              }
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
  config
}

