# CainiaoTracking SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CainiaoTrackingFeatures
  def self.make_feature(name)
    case name
    when "base"
      CainiaoTrackingBaseFeature.new
    when "ratelimit"
      CainiaoTrackingRatelimitFeature.new
    when "retry"
      CainiaoTrackingRetryFeature.new
    when "test"
      CainiaoTrackingTestFeature.new
    when "timeout"
      CainiaoTrackingTimeoutFeature.new
    else
      CainiaoTrackingBaseFeature.new
    end
  end
end
