<?php
declare(strict_types=1);

// CainiaoTracking SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CainiaoTrackingFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CainiaoTrackingBaseFeature();
            case "test":
                return new CainiaoTrackingTestFeature();
            default:
                return new CainiaoTrackingBaseFeature();
        }
    }
}
