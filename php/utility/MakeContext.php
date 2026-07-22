<?php
declare(strict_types=1);

// CainiaoTracking SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CainiaoTrackingMakeContext
{
    public static function call(array $ctxmap, ?CainiaoTrackingContext $basectx): CainiaoTrackingContext
    {
        return new CainiaoTrackingContext($ctxmap, $basectx);
    }
}
