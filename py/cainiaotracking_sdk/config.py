# CainiaoTracking SDK configuration


def make_config():
    return {
        "main": {
            "name": "CainiaoTracking",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://global.cainiao.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "tracking": {},
            },
        },
        "entity": {
      "tracking": {
        "fields": [
          {
            "active": True,
            "name": "destCountry",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "latestTrackingInfo",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "mailNo",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "originCountry",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "statusDescription",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "trackingList",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 6,
          },
        ],
        "name": "tracking",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "en-US",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "en-US",
                      "kind": "query",
                      "name": "language",
                      "orig": "language",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "ZH363796677HK",
                      "kind": "query",
                      "name": "mail_no",
                      "orig": "mail_no",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/global/detail.json",
                "parts": [
                  "global",
                  "detail.json",
                ],
                "select": {
                  "exist": [
                    "lang",
                    "language",
                    "mail_no",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
