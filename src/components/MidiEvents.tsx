/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as midiInfo from '~/midi/midiInfo';
import * as midiEvent from '~/midi/event';
import throttle from '~/utility/throttle';
import DatatableToolbar from '~/components/DatatableToolbar';
import { groupConsecutiveEvents } from '~/utility/groupConsecutive';

const NUM_OF_EVENTS = 50;

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
    container: {
        maxHeight: 500,
    },
});

const StyledTableCell = withStyles({
    head: {
        borderBottom: '2px solid',
        marginBottom: '5px',
        fontFamily: "'Playfair Display', serif",
    },
    body: {
        height: 33,
        fontSize: 14,
    },
})(TableCell);

interface Props {
    initialEvents: Array<midiEvent.SupportedEvent>;
    onIncomingEvent: (e: midiEvent.SupportedEvent) => void;
    midiInputs: midiInfo.MIDIInputs;
}

type EventList = midiEvent.SupportedEvent[];

function filterOutNonGroupableEvents(events: EventList): EventList {
    return events.filter(event => event.type !== 'noteoff');
}

function assertNever(event: never): never {
    throw new Error('Unexpected event ' + event);
}
const getEventValue: (event: midiEvent.SupportedEvent) => string = event => {
    switch (event.type) {
        case 'noteon':
            return `${event.noteName + event.octave} ${event.velocity}`;
        case 'noteoff':
            return event.noteName + event.octave;
        case 'control change':
            return `CC${event.controllerNumber} ${event.controllerValue}`;
        case 'input connected':
            return event.input.name ? event.input.name : '-';
        case 'other':
            return '-';
        default:
            return assertNever(event);
    }
};

function isEventContainer(e: midiEvent.SupportedEvent | midiEvent.EventContainer): e is midiEvent.EventContainer {
    return (e as midiEvent.EventContainer).children != undefined;
}

function maybeGroupEvents(events: EventList, grouped: boolean): EventList | midiEvent.EventContainer[] {
    return grouped
        ? groupConsecutiveEvents(
              events,
              (currentContainer: midiEvent.EventContainer | null, currentEvent: midiEvent.SupportedEvent) =>
                  currentContainer?.type === currentEvent.type,
          )
        : events;
}

function getEventsToShow(events: EventList, grouped: boolean): EventPresentation[] {
    const maybeGrouped = grouped ? maybeGroupEvents(filterOutNonGroupableEvents(events), true) : events;

    const presentation: EventPresentation[] = [];
    maybeGrouped.forEach((eventOrContainer: midiEvent.SupportedEvent | midiEvent.EventContainer) => {
        if (isEventContainer(eventOrContainer)) {
            presentation.push({
                type: eventOrContainer.type,
                timestamp: '',
                value: `(${eventOrContainer.children.length})`,
                input: 'afaf',
            } as EventPresentation);
        } else {
            presentation.push({
                type: eventOrContainer.type,
                timestamp: new Date(eventOrContainer.timestamp).toUTCString(),
                value: getEventValue(eventOrContainer),
                input: eventOrContainer.input.name,
            } as EventPresentation);
        }
    });
    return presentation;
}

interface EventPresentation {
    type: 'noteon' | 'noteoff' | 'control change' | 'other';
    timestamp: string;
    value: string;
    input: string;
}

const MidiEvents: React.FC<Props> = props => {
    const classes = useStyles();
    const [events, setEvents] = useState(props.initialEvents);
    const [groupEvents, setGroupEvents] = useState(false);

    const throttledOnIncomingEvent = useCallback(throttle(props.onIncomingEvent), []);

    const handleGroupEventsChange: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
        setGroupEvents(event.currentTarget.checked);
    };

    useEffect(() => {
        props.midiInputs.forEach(input => {
            input.onmidimessage = (e: WebMidi.MIDIMessageEvent): void => {
                const newEvent = midiEvent.createFromRawData(e, input);
                if (newEvent !== null) {
                    console.log(newEvent);
                    throttledOnIncomingEvent(newEvent);
                    setEvents(currentEvents => {
                        const sliceIndex =
                            currentEvents.length - NUM_OF_EVENTS >= 0 ? currentEvents.length - NUM_OF_EVENTS : 0;
                        return [...currentEvents.slice(sliceIndex), newEvent];
                    });
                }
            };
        });
    });

    useEffect(() => {
        // setEvents(filterOutNonGroupableEvents(events));
    }, [groupEvents]);
    return (
        <TableContainer className={classes.container}>
            <DatatableToolbar groupEvents={groupEvents} onGroupEeventsChange={handleGroupEventsChange} />
            <Table className={classes.table} size="small" stickyHeader aria-label="MIDI event list">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Values</StyledTableCell>
                        <StyledTableCell>Input</StyledTableCell>
                        <StyledTableCell>Timestamp</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getEventsToShow(events, groupEvents).map((event: EventPresentation, rowNumber: number) => {
                        return (
                            <TableRow key={rowNumber}>
                                <StyledTableCell component="th" scope="row">
                                    {event.type}
                                </StyledTableCell>
                                <StyledTableCell>{event.value}</StyledTableCell>
                                <StyledTableCell>{event.input}</StyledTableCell>
                                <StyledTableCell>{event.timestamp}</StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MidiEvents;
