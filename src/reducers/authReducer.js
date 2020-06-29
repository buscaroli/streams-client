import { SIGN_IN, SIGN_OUT } from '../actions/types' // makes it easier to spot errors
                                            // if the types are mispelled as
                                            // we get errors by using VARIABLES
                                            // but not by using STRINGS.

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload }
            case SIGN_OUT:
                return { ...state, isSignedIn: false, userId: null }
            default:
                return state
    }
}