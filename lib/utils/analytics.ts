export interface AnalyticsEvent {
    timestamp: Date;
    type: 'step' | 'action' | 'error';
    message: string;
    data?: any;
}

export class LocalAnalytics {
    private events: AnalyticsEvent[] = [];
    private maxEvents: number = 100;

    log(type: AnalyticsEvent['type'], message: string, data?: any) {
        const event: AnalyticsEvent = {
            timestamp: new Date(),
            type,
            message,
            data,
        };
        
        this.events.push(event);
        
        // Keep only last maxEvents
        if (this.events.length > this.maxEvents) {
            this.events.shift();
        }
    }

    getEvents(): AnalyticsEvent[] {
        return [...this.events];
    }

    clear() {
        this.events = [];
    }

    export(): string {
        return JSON.stringify(this.events, null, 2);
    }
}

export const analytics = new LocalAnalytics();
