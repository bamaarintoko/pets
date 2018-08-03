import {initialAdd, initialGet, initialUpdate} from "../Utils/initialState";

export function redAddReserve(state = initialAdd, action) {
    switch (action.type) {
        case "ADD_RESERVE":
            return {
                status: true,
                status_add: action.status_add,
                message: action.message,
                data: action.data
            }
        case "RESET_ADD_RESERVE":
            return {
                status: false,
                status_add: false,
                message: "",
                data: []
            }
        default :
            return state;
    }
}

export function redGetListReserve(state = initialGet, action) {
    switch (action.type) {
        case "RESERVE":
            return {
                status: true,
                status_get: action.status_get,
                message: action.message,
                data: action.data
            }
        case "RESET_RESERVE":
            return {
                status: false,
                status_get: false,
                message: "",
                data: []
            }
        default:
            return state;
    }
}

export function redGetListReserveUser(state = initialGet, action) {
    switch (action.type) {
        case "RESERVE_USER":
            return {
                status: true,
                status_get: action.status_get,
                message: action.message,
                data: action.data
            }
        case "RESET_RESERVE_USER":
            return {
                status: false,
                status_get: false,
                message: "",
                data: []
            }
        default :
            return state;
    }
}

export function redUpdateReserve(state = initialUpdate, action) {
    switch (action.type) {
        case "UPDATE_RESERVE":
            return {
                status: true,
                status_update: action.status_update,
                message: action.message,
                data: action.data
            }
        case "UPDATE_RESET":
            return {
                status: false,
                status_update: false,
                message: "",
                data: []
            }
        default :
            return state;
    }
}