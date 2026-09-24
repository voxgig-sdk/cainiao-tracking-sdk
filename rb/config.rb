# CainiaoTracking SDK configuration

module CainiaoTrackingConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "CainiaoTracking",
        "slug" => "cainiao-tracking",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://global.cainiao.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "tracking" => {},
        },
      },
      "entity" => {
        "tracking" => {
          "fields" => [
            {
              "name" => "destCountry",
              "title" => "Dest Country",
              "type" => "`$STRING`",
              "short" => "Destination country code",
            },
            {
              "name" => "latestTrackingInfo",
              "title" => "Latest Tracking Info",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "mailNo",
              "title" => "Mail No",
              "type" => "`$STRING`",
              "short" => "The tracking number of the shipment",
            },
            {
              "name" => "originCountry",
              "title" => "Origin Country",
              "type" => "`$STRING`",
              "short" => "Origin country code",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
              "short" => "Current status of the shipment",
            },
            {
              "name" => "statusDescription",
              "title" => "Status Description",
              "type" => "`$STRING`",
              "short" => "Detailed description of the current status",
            },
            {
              "name" => "trackingList",
              "title" => "Tracking List",
              "type" => "`$ARRAY`",
              "short" => "Complete tracking history",
            },
          ],
          "name" => "tracking",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/global/detail.json",
                  "segments" => [
                    {
                      "lit" => "global",
                    },
                    {
                      "lit" => "detail.json",
                    },
                  ],
                  "parts" => [
                    "global",
                    "detail.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en-US",
                      },
                      {
                        "name" => "language",
                        "orig" => "language",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en-US",
                      },
                      {
                        "name" => "mail_no",
                        "orig" => "mail_no",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "ZH363796677HK",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "lang",
                      "language",
                      "mail_no",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CainiaoTrackingFeatures.make_feature(name)
  end
end
