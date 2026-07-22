# frozen_string_literal: true

# Typed models for the CainiaoTracking SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Tracking entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] error_code
#   @return [String, nil]
#
# @!attribute [rw] error_msg
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Tracking = Struct.new(
  :data,
  :error_code,
  :error_msg,
  :success,
  keyword_init: true
)

# Request payload for Tracking#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] error_code
#   @return [String, nil]
#
# @!attribute [rw] error_msg
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
TrackingLoadMatch = Struct.new(
  :data,
  :error_code,
  :error_msg,
  :success,
  keyword_init: true
)

