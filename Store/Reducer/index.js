import AuthReducer from './AuthReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    root: AuthReducer
});

