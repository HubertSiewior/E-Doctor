import {SHOW_MESSAGE} from "./constans";

const showErrorPopup = (error_message) => {
    return(
        {
            type: SHOW_MESSAGE,
            error_message: error_message
        }
    )
}

export {showErrorPopup}