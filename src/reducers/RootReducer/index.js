import { combineReducers } from 'redux';
import homeReducer from '../HomeReducer';
import appReducer from '../AppReducer';
import testReducer from '../TestReducer';
import placementReducer from '../PlacementReducer';

export default combineReducers({
    homeReducer,
    appReducer,
    testReducer,
    placementReducer
});