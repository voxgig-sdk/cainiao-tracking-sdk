<?php
declare(strict_types=1);

// CainiaoTracking SDK utility: result_headers

class CainiaoTrackingResultHeaders
{
    public static function call(CainiaoTrackingContext $ctx): ?CainiaoTrackingResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
