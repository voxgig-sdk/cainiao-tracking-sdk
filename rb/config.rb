# CainiaoTracking SDK configuration

module CainiaoTrackingConfig
  def self.make_config
    {
      "main" => {
        "name" => "CainiaoTracking",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "active" => true,
              "name" => "data",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "error_code",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "error_msg",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "success",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 3,
            },
          ],
          "name" => "tracking",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "en-US",
                        "kind" => "query",
                        "name" => "lang",
                        "orig" => "lang",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "en-US",
                        "kind" => "query",
                        "name" => "language",
                        "orig" => "language",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "ZH363796677HK",
                        "kind" => "query",
                        "name" => "mail_no",
                        "orig" => "mail_no",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/global/detail.json",
                  "parts" => [
                    "global",
                    "detail.json",
                  ],
                  "select" => {
                    "exist" => [
                      "lang",
                      "language",
                      "mail_no",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
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
