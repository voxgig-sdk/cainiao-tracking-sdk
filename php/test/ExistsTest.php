<?php
declare(strict_types=1);

// CainiaoTracking SDK exists test

require_once __DIR__ . '/../cainiaotracking_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CainiaoTrackingSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
