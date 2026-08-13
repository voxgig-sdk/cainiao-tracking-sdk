# CainiaoTracking SDK feature factory

from cainiaotracking_sdk.feature.base_feature import CainiaoTrackingBaseFeature
from cainiaotracking_sdk.feature.test_feature import CainiaoTrackingTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CainiaoTrackingBaseFeature(),
        "test": lambda: CainiaoTrackingTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
