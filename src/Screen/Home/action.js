import Api from "../../Utils/Api";

export function actGetListReserve() {
    return dispatch => {
        Api._POST('reserve/list_reserve')
            .then((response) => {
                dispatch({
                    type: 'RESERVE',
                    status_get: response.data.status,
                    data: response.data.result,
                    message: response.data.message
                })
            }).catch((err) => {
            dispatch({
                type: 'RESERVE',
                status_get: false,
                data: [],
                message: err.message
            })
        })
    }
}

export function actGetDetailReserve() {

}