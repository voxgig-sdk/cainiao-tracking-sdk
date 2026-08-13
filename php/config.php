<?php
declare(strict_types=1);

// CainiaoTracking SDK configuration

class CainiaoTrackingConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CainiaoTracking",
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
              'active' => true,
              'name' => 'destCountry',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'latestTrackingInfo',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'mailNo',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'originCountry',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'statusDescription',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'trackingList',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 6,
            ],
          ],
          'name' => 'tracking',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'en-US',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'en-US',
                        'kind' => 'query',
                        'name' => 'language',
                        'orig' => 'language',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
