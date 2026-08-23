package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CainiaoTracking",
			"slug": "cainiao-tracking",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://global.cainiao.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"tracking": map[string]any{},
			},
		},
		"entity": map[string]any{
			"tracking": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "destCountry",
						"short": "Destination country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latestTrackingInfo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "mailNo",
						"short": "The tracking number of the shipment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "originCountry",
						"short": "Origin country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Current status of the shipment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "statusDescription",
						"short": "Detailed description of the current status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trackingList",
						"short": "Complete tracking history",
						"type": "`$ARRAY`",
					},
				},
				"name": "tracking",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "en-US",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "en-US",
											"kind": "query",
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "ZH363796677HK",
											"kind": "query",
											"name": "mail_no",
											"orig": "mail_no",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/global/detail.json",
								"parts": []any{
									"global",
									"detail.json",
								},
								"select": map[string]any{
									"exist": []any{
										"lang",
										"language",
										"mail_no",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
