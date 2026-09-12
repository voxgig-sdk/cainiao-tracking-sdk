export interface Tracking {
    destCountry?: string;
    latestTrackingInfo?: Record<string, any>;
    mailNo?: string;
    originCountry?: string;
    status?: string;
    statusDescription?: string;
    trackingList?: any[];
}
export interface TrackingLoadMatch {
    lang?: string;
    language?: string;
    mail_no: string;
}
