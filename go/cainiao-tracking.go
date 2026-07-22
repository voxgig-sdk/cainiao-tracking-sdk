package voxgigcainiaotrackingsdk

import (
	"github.com/voxgig-sdk/cainiao-tracking-sdk/go/core"
	"github.com/voxgig-sdk/cainiao-tracking-sdk/go/entity"
	"github.com/voxgig-sdk/cainiao-tracking-sdk/go/feature"
	_ "github.com/voxgig-sdk/cainiao-tracking-sdk/go/utility"
)

// Type aliases preserve external API.
type CainiaoTrackingSDK = core.CainiaoTrackingSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CainiaoTrackingEntity = core.CainiaoTrackingEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CainiaoTrackingError = core.CainiaoTrackingError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTrackingEntityFunc = func(client *core.CainiaoTrackingSDK, entopts map[string]any) core.CainiaoTrackingEntity {
		return entity.NewTrackingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCainiaoTrackingSDK = core.NewCainiaoTrackingSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCainiaoTrackingSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CainiaoTrackingSDK  { return NewCainiaoTrackingSDK(nil) }
func Test() *CainiaoTrackingSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
