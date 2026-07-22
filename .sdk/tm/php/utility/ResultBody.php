<?php
declare(strict_types=1);

// CainiaoTracking SDK utility: result_body

class CainiaoTrackingResultBody
{
    public static function call(CainiaoTrackingContext $ctx): ?CainiaoTrackingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
