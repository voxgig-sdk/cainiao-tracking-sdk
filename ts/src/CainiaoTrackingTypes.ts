// Typed models for the CainiaoTracking SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Tracking {
  destCountry?: string
  latestTrackingInfo?: Record<string, any>
  mailNo?: string
  originCountry?: string
  status?: string
  statusDescription?: string
  trackingList?: any[]
}

export interface TrackingLoadMatch {
  lang?: string
  language?: string
  mail_no: string
}

