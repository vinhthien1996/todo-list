import { combineReducers, createStore } from 'redux';
import { TaskReducer } from './reducers/TaskReducer';

const rootReducer = combineReducers({
    TaskReducer
})

export const store = createStore(rootReducer);