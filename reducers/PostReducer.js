import * as POST_ACTIONS from '../actions/PostingActions';

const INITIAL_STATE = {
    idPosting: null,
    postLoading: false,
    successfulPost: false
}

const PostReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case(POST_ACTIONS.START_POST):
            return { ...state, postLoading: true }
        case(POST_ACTIONS.FAILED_POST):
            return { ...state, postLoading: false, successfulPost: false }
        case(POST_ACTIONS.SUCCESSFUL_POST):
            return { ...state, postLoading: false, successfulPost: true }
        case(POST_ACTIONS.CLEAR_POST_STATUS):
            return { ...state, postLoading: false, successfulPost: false }
        default:
            return state
    }
}

export default PostReducer;