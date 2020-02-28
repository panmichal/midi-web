import { combineReducers, createStore } from 'redux';
import { eventReducer } from '~/store/events/reducers';

const rootReducer = combineReducers({
    event: eventReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
