# CainiaoTracking SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CainiaoTrackingUtility.registrar = ->(u) {
  u.clean = CainiaoTrackingUtilities::Clean
  u.done = CainiaoTrackingUtilities::Done
  u.make_error = CainiaoTrackingUtilities::MakeError
  u.feature_add = CainiaoTrackingUtilities::FeatureAdd
  u.feature_hook = CainiaoTrackingUtilities::FeatureHook
  u.feature_init = CainiaoTrackingUtilities::FeatureInit
  u.fetcher = CainiaoTrackingUtilities::Fetcher
  u.make_fetch_def = CainiaoTrackingUtilities::MakeFetchDef
  u.make_context = CainiaoTrackingUtilities::MakeContext
  u.make_options = CainiaoTrackingUtilities::MakeOptions
  u.make_request = CainiaoTrackingUtilities::MakeRequest
  u.make_response = CainiaoTrackingUtilities::MakeResponse
  u.make_result = CainiaoTrackingUtilities::MakeResult
  u.make_point = CainiaoTrackingUtilities::MakePoint
  u.make_spec = CainiaoTrackingUtilities::MakeSpec
  u.make_url = CainiaoTrackingUtilities::MakeUrl
  u.param = CainiaoTrackingUtilities::Param
  u.prepare_auth = CainiaoTrackingUtilities::PrepareAuth
  u.prepare_body = CainiaoTrackingUtilities::PrepareBody
  u.prepare_headers = CainiaoTrackingUtilities::PrepareHeaders
  u.prepare_method = CainiaoTrackingUtilities::PrepareMethod
  u.prepare_params = CainiaoTrackingUtilities::PrepareParams
  u.prepare_path = CainiaoTrackingUtilities::PreparePath
  u.prepare_query = CainiaoTrackingUtilities::PrepareQuery
  u.graphql_body = CainiaoTrackingUtilities::GraphqlBody
  u.graphql_errors = CainiaoTrackingUtilities::GraphqlErrors
  u.result_basic = CainiaoTrackingUtilities::ResultBasic
  u.result_body = CainiaoTrackingUtilities::ResultBody
  u.result_headers = CainiaoTrackingUtilities::ResultHeaders
  u.transform_request = CainiaoTrackingUtilities::TransformRequest
  u.transform_response = CainiaoTrackingUtilities::TransformResponse
}
