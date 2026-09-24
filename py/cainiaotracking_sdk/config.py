# CainiaoTracking SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "cainiao-tracking",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Dest Country",
            "type": "`$STRING`",
            "short": "Destination country code",
          },
          {
            "name": "latestTrackingInfo",
            "title": "Latest Tracking Info",
            "type": "`$OBJECT`",
          },
          {
            "name": "mailNo",
            "title": "Mail No",
            "type": "`$STRING`",
            "short": "The tracking number of the shipment",
          },
          {
            "name": "originCountry",
            "title": "Origin Country",
            "type": "`$STRING`",
            "short": "Origin country code",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "Current status of the shipment",
          },
          {
            "name": "statusDescription",
            "title": "Status Description",
            "type": "`$STRING`",
            "short": "Detailed description of the current status",
          },
          {
            "name": "trackingList",
            "title": "Tracking List",
            "type": "`$ARRAY`",
            "short": "Complete tracking history",
          },
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
                    "lit": "global",
                  },
                  {
                    "lit": "detail.json",
                  },
                ],
                "parts": [
                  "global",
                  "detail.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en-US",
                    },
                    {
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en-US",
                    },
                    {
                      "name": "mail_no",
                      "orig": "mail_no",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "ZH363796677HK",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "lang",
                    "language",
                    "mail_no",
                  ],
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
