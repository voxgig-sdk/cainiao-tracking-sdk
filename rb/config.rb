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
            "now" => "`$FUNCTION`",
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
              "name" => "data",
              "title" => "Data",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "errorCode",
              "title" => "Error Code",
              "type" => "`$STRING`",
              "short" => "Error code if applicable",
            },
            {
              "name" => "errorMsg",
              "title" => "Error Msg",
              "type" => "`$STRING`",
              "short" => "Error message if applicable",
            },
            {
              "name" => "success",
              "title" => "Success",
              "type" => "`$BOOLEAN`",
              "short" => "Indicates if the request was successful",
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
                    "res" => "`body`",
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
                        "orig" => "mailNos",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "ZH363796677HK",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "mail_no",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
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
