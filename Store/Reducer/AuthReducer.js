import ActionTypes from '../Constant/Constant';

const INITIAL_STATE = {
    CURRENTUSERUID: null,
    CURRENTUSER: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CURRENTUSERUID:
            return ({
                ...states,
                CURRENTUSERUID: action.payload
            })
        case ActionTypes.CURRENTUSER:
            return ({
                ...states,
                CURRENTUSER: action.payload
            })
        default:
            return states;
    }

}