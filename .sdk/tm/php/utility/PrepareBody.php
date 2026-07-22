<?php
declare(strict_types=1);

// CainiaoTracking SDK utility: prepare_body

class CainiaoTrackingPrepareBody
{
    public static function call(CainiaoTrackingContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
