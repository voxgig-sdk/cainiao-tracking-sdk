<?php
declare(strict_types=1);

// CainiaoTracking SDK configuration

class CainiaoTrackingConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CainiaoTracking",
                "slug" => "cainiao-tracking",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://global.cainiao.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "tracking" => [],
                ],
            ],
            "entity" => [
        'tracking' => [
          'fields' => [
            [
              'name' => 'destCountry',
              'short' => 'Destination country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'latestTrackingInfo',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'mailNo',
              'short' => 'The tracking number of the shipment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'originCountry',
              'short' => 'Origin country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'short' => 'Current status of the shipment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'statusDescription',
              'short' => 'Detailed description of the current status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'trackingList',
              'short' => 'Complete tracking history',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'tracking',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'en-US',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'en-US',
                        'kind' => 'query',
                        'name' => 'language',
                        'orig' => 'language',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'ZH363796677HK',
                        'kind' => 'query',
                        'name' => 'mail_no',
                        'orig' => 'mail_no',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/global/detail.json',
                  'parts' => [
                    'global',
                    'detail.json',
                  ],
                  'select' => [
                    'exist' => [
                      'lang',
                      'language',
                      'mail_no',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CainiaoTrackingFeatures::make_feature($name);
    }
}
