<?php
declare(strict_types=1);

// Typed models for the CainiaoTracking SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Tracking entity data model. */
class Tracking
{
    public ?array $data = null;
    public ?string $errorCode = null;
    public ?string $errorMsg = null;
    public ?bool $success = null;
}

/** Request payload for Tracking#load. */
class TrackingLoadMatch
{
    public ?string $lang = null;
    public ?string $language = null;
    public string $mail_no;
}

