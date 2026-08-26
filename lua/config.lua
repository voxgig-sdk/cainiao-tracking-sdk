-- CainiaoTracking SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CainiaoTracking",
      slug = "cainiao-tracking",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
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
            ["short"] = "Destination country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latestTrackingInfo",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "mailNo",
            ["short"] = "The tracking number of the shipment",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "originCountry",
            ["short"] = "Origin country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Current status of the shipment",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "statusDescription",
            ["short"] = "Detailed description of the current status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "trackingList",
            ["short"] = "Complete tracking history",
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
