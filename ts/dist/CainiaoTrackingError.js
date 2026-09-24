"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CainiaoTrackingError = void 0;
class CainiaoTrackingError extends Error {
    isCainiaoTrackingError = true;
    sdk = 'CainiaoTracking';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CainiaoTrackingError = CainiaoTrackingError;
//# sourceMappingURL=CainiaoTrackingError.js.map