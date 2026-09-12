import { Context } from './Context';
declare class CainiaoTrackingError extends Error {
    isCainiaoTrackingError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CainiaoTrackingError };
