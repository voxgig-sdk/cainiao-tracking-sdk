-- CainiaoTracking SDK error

local CainiaoTrackingError = {}
CainiaoTrackingError.__index = CainiaoTrackingError


function CainiaoTrackingError.new(code, msg, ctx)
  local self = setmetatable({}, CainiaoTrackingError)
  self.is_sdk_error = true
  self.sdk = "CainiaoTracking"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CainiaoTrackingError:error()
  return self.msg
end


function CainiaoTrackingError:__tostring()
  return self.msg
end


return CainiaoTrackingError
