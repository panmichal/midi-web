import { EventPresentation } from '~/midi/event';

export function filterEvents(filterQuery: string | null, events: EventPresentation[]): EventPresentation[] {
    if (filterQuery === null || filterQuery === '') {
        return events;
    } else {
        return events.filter(event => event.value.includes(filterQuery) || event.type.includes(filterQuery));
    }
}
