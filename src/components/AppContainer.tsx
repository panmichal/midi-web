import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { MIDIInputs } from '~/midi/midiInfo';
import { SupportedEvent } from '~/midi/event';
import MidiInputs from '~/components/MidiInputs';
import MidiEvents from '~/components/MidiEventTable';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Placeholder from '~/components/Placeholder';
import Panels from '~/components/Panels';
import throttle from '~/utility/throttle';

interface Props {
    midiInputs: MIDIInputs;
}

const useStyles = makeStyles({
    progress: {
        margin: 'auto',
        width: 100,
        padding: 100,
    },
});

export default function AppContainer(props: Props) {
    const classes = useStyles();
    const { midiInputs } = props;
    const [hasNewEvent, setHasNewEvent] = useState(false);
    const [hasRecentInputListChange, setRecentInputListChange] = useState(false);
    const [isMIDIReady, setIsMIDIReady] = useState(false);
    const onIncomingEvent: (event: SupportedEvent) => void = () => {
        if (!hasNewEvent) {
            setHasNewEvent(true);
        }
    };

    useEffect(() => {
        if (isMIDIReady && !hasRecentInputListChange) {
            throttle(() => setRecentInputListChange(true), 500)();
        }
        if (midiInputs.length > 0) {
            setIsMIDIReady(true);
        }
    }, [midiInputs]);

    const getContent = (): React.ReactNode => {
        if (isMIDIReady && midiInputs.length > 0) {
            return (
                <Panels
                    inputsTable={<MidiInputs inputs={props.midiInputs}></MidiInputs>}
                    eventsTable={
                        <MidiEvents
                            initialEvents={[]}
                            midiInputs={props.midiInputs}
                            onIncomingEvent={onIncomingEvent}
                        ></MidiEvents>
                    }
                    hasNewEvent={hasNewEvent}
                    onDigestNewEvent={() => setHasNewEvent(false)}
                    hasRecentInputListChange={hasRecentInputListChange}
                    onDigestInputListChange={() => setRecentInputListChange(false)}
                ></Panels>
            );
        } else if (midiInputs.length === 0) {
            return <Placeholder />;
        } else {
            return (
                <div className={classes.progress}>
                    <CircularProgress />
                </div>
            );
        }
    };

    return <Container maxWidth="md">{getContent()}</Container>;
}
