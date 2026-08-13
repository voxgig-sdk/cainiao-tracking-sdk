# CainiaoTracking SDK exists test

import pytest
from cainiaotracking_sdk import CainiaoTrackingSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CainiaoTrackingSDK.test(None, None)
        assert testsdk is not None
