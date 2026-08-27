<?php
declare(strict_types=1);

// Typed models for the CainiaoTracking SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Tracking entity data model. */
class Tracking
{
    public ?string $destCountry = null;
    public ?array $latestTrackingInfo = null;
    public ?string $mailNo = null;
    public ?string $originCountry = null;
    public ?string $status = null;
    public ?string $statusDescription = null;
    public ?array $trackingList = null;
}

/** Request payload for Tracking#load. */
class TrackingLoadMatch
{
    public ?string $lang = null;
    public ?string $language = null;
    public string $mail_no;
}

