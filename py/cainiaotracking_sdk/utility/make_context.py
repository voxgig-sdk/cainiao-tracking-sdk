# CainiaoTracking SDK utility: make_context

from cainiaotracking_sdk.core.context import CainiaoTrackingContext


def make_context_util(ctxmap, basectx):
    return CainiaoTrackingContext(ctxmap, basectx)
