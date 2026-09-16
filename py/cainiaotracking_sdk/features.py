# CainiaoTracking SDK feature factory

from cainiaotracking_sdk.feature.base_feature import CainiaoTrackingBaseFeature
from cainiaotracking_sdk.feature.ratelimit_feature import CainiaoTrackingRatelimitFeature
from cainiaotracking_sdk.feature.retry_feature import CainiaoTrackingRetryFeature
from cainiaotracking_sdk.feature.test_feature import CainiaoTrackingTestFeature
from cainiaotracking_sdk.feature.timeout_feature import CainiaoTrackingTimeoutFeature


_FEATURES = {
    "base": lambda: CainiaoTrackingBaseFeature(),
    "ratelimit": lambda: CainiaoTrackingRatelimitFeature(),
    "retry": lambda: CainiaoTrackingRetryFeature(),
    "test": lambda: CainiaoTrackingTestFeature(),
    "timeout": lambda: CainiaoTrackingTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
