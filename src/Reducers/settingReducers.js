import {initialGet} from "../Utils/initialState";

export function redSetting(state = initialGet, action) {
    switch (action.type){
        case "SETTING":
            return {
                status : true,
                status_get : action.status_get,
                message : action.message,
                data : action.data
            };
        case "RESET_SETTING":
            return {
                status: false,
            }
        default : return state;
    }
}