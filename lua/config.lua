-- CainiaoTracking SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CainiaoTracking",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://global.cainiao.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["tracking"] = {},
      },
    },
    entity = {
      ["tracking"] = {
        ["fields"] = {
          {
            ["name"] = "destCountry",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latestTrackingInfo",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "mailNo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "originCountry",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "statusDescription",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "trackingList",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "tracking",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "en-US",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "en-US",
                      ["kind"] = "query",
                      ["name"] = "language",
                      ["orig"] = "language",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "ZH363796677HK",
                      ["kind"] = "query",
                      ["name"] = "mail_no",
                      ["orig"] = "mail_no",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/global/detail.json",
                ["parts"] = {
                  "global",
                  "detail.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "lang",
                    "language",
                    "mail_no",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
