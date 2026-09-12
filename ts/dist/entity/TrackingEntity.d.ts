import { CainiaoTrackingEntityBase } from '../CainiaoTrackingEntityBase';
import type { CainiaoTrackingSDK } from '../CainiaoTrackingSDK';
import type { Control } from '../types';
import type { Tracking, TrackingLoadMatch } from '../CainiaoTrackingTypes';
declare class TrackingEntity extends CainiaoTrackingEntityBase<Tracking> {
    constructor(client: CainiaoTrackingSDK, entopts: any);
    make(this: TrackingEntity): TrackingEntity;
    load(this: any, reqmatch?: TrackingLoadMatch, ctrl?: Control): Promise<TrackingEntity>;
}
export { TrackingEntity };
