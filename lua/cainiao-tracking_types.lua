-- Typed models for the CainiaoTracking SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Tracking
---@field data? table
---@field errorCode? string
---@field errorMsg? string
---@field success? boolean

---@class TrackingLoadMatch
---@field lang? string
---@field language? string
---@field mail_no string

local M = {}

return M
