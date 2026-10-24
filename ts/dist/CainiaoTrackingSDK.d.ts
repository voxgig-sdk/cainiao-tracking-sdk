import { TrackingEntity } from './entity/TrackingEntity';
export type * from './CainiaoTrackingTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CainiaoTrackingEntityBase } from './CainiaoTrackingEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class CainiaoTrackingSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Tracking(entopts?: Record<string, any>): TrackingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CainiaoTrackingSDK;
    tester(testopts?: any, sdkopts?: any): CainiaoTrackingSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CainiaoTrackingSDK;
export { stdutil, config, BaseFeature, CainiaoTrackingEntityBase, CainiaoTrackingSDK, SDK, };
export type { DirectResult };
