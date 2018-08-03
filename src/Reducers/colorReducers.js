import { initialGet } from "../Utils/initialState";

export function redGetColor(state = initialGet, action) {
    // console.log(action.type)
    switch (action.type) {
        case 'GET_COLOR':
            return {
                status: true,
                status_get: true,
                data: action.data,
                message: action.message
            }
        case 'GET_COLOR_RESET':
            return {
                status : false,
                status_get : false,
                data : action.data,
                message : ""
            }
        default:
            return state;
    }
}