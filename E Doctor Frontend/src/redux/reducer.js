import {SHOW_MESSAGE} from "./constans";

const initialState = {
    error_message: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MESSAGE:
            return(
                {
                    ...state,
                    error_message: action.error_message
                }
            )
        default:
            return state;
    }
}

export {reducer}