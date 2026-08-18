# CainiaoTracking SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "destCountry",
            "type": "`$STRING`",
          },
          {
            "name": "latestTrackingInfo",
            "type": "`$OBJECT`",
          },
          {
            "name": "mailNo",
            "type": "`$STRING`",
          },
          {
            "name": "originCountry",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "statusDescription",
            "type": "`$STRING`",
          },
          {
            "name": "trackingList",
            "type": "`$ARRAY`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "en-US",
                      "kind": "query",
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                    },
                    {
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
