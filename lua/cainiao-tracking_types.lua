-- Typed models for the CainiaoTracking SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Tracking
---@field data? table
---@field error_code? string
---@field error_msg? string
---@field success? boolean

---@class TrackingLoadMatch
---@field data? table
---@field error_code? string
---@field error_msg? string
---@field success? boolean

local M = {}

return M
