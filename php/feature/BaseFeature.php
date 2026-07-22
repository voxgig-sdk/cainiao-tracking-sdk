<?php
declare(strict_types=1);

// CainiaoTracking SDK base feature

class CainiaoTrackingBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CainiaoTrackingContext $ctx, array $options): void {}
    public function PostConstruct(CainiaoTrackingContext $ctx): void {}
    public function PostConstructEntity(CainiaoTrackingContext $ctx): void {}
    public function SetData(CainiaoTrackingContext $ctx): void {}
    public function GetData(CainiaoTrackingContext $ctx): void {}
    public function GetMatch(CainiaoTrackingContext $ctx): void {}
    public function SetMatch(CainiaoTrackingContext $ctx): void {}
    public function PrePoint(CainiaoTrackingContext $ctx): void {}
    public function PreSpec(CainiaoTrackingContext $ctx): void {}
    public function PreRequest(CainiaoTrackingContext $ctx): void {}
    public function PreResponse(CainiaoTrackingContext $ctx): void {}
    public function PreResult(CainiaoTrackingContext $ctx): void {}
    public function PreDone(CainiaoTrackingContext $ctx): void {}
    public function PreUnexpected(CainiaoTrackingContext $ctx): void {}
}
