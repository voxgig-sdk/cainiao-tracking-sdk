# CainiaoTracking SDK utility: make_context
require_relative '../core/context'
module CainiaoTrackingUtilities
  MakeContext = ->(ctxmap, basectx) {
    CainiaoTrackingContext.new(ctxmap, basectx)
  }
end
