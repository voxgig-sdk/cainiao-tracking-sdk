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
# @!attribute [rw] destCountry
#   @return [String, nil]
#
# @!attribute [rw] latestTrackingInfo
#   @return [Hash, nil]
#
# @!attribute [rw] mailNo
#   @return [String, nil]
#
# @!attribute [rw] originCountry
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] statusDescription
#   @return [String, nil]
#
# @!attribute [rw] trackingList
#   @return [Array, nil]
Tracking = Struct.new(
  :destCountry,
  :latestTrackingInfo,
  :mailNo,
  :originCountry,
  :status,
  :statusDescription,
  :trackingList,
  keyword_init: true
)

# Request payload for Tracking#load.
#
# @!attribute [rw] destCountry
#   @return [String, nil]
#
# @!attribute [rw] latestTrackingInfo
#   @return [Hash, nil]
#
# @!attribute [rw] mailNo
#   @return [String, nil]
#
# @!attribute [rw] originCountry
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] statusDescription
#   @return [String, nil]
#
# @!attribute [rw] trackingList
#   @return [Array, nil]
TrackingLoadMatch = Struct.new(
  :destCountry,
  :latestTrackingInfo,
  :mailNo,
  :originCountry,
  :status,
  :statusDescription,
  :trackingList,
  keyword_init: true
)

