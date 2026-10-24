# CainiaoTracking SDK utility: prepare_body
require_relative 'media'
module CainiaoTrackingUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CainiaoTrackingUtilities.raw_body(ctx.reqdata) if CainiaoTrackingUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
