import Api from "../../Utils/Api";

export function actLogin(params) {
    return dispatch => {
        Api._POST('auth/login', params)
            .then((response) => {
                let data_ = {name: response.data.result.user_name, photo: response.data.result.user_photo}
                if (response.data.status) {
                    dispatch({
                        type: 'LOGIN',
                        status_get: true,
                        data: {data: data_, profile: response.data.result},
                        message: response.data.message
                    })
                } else {
                    dispatch({
                        type: 'LOGIN',
                        status_get: false,
                        data: [],
                        message: response.data.message
                    })
                }

                console.log(response)
            }).catch((err) => {
            console.log(err.message)
            dispatch({
                type: 'LOGIN',
                status_get: false,
                data: [],
                message: err.message
            })
        })
    }
}

export function actLoginFacebook(params, data) {
    return dispatch => {
        Api._POST('auth/login_with_facebook', params)
            .then((response) => {
                console.log(response)
                if (response.data.status) {
                    dispatch({
                        type: 'LOGIN',
                        status_get: true,
                        data: {data: data, profile: response.data.result},
                        message: "login facebook sukses"
                    })
                    dispatch({type: 'RESET'})
                }
            }).catch((err) => {
            dispatch({
                type: 'LOGIN',
                status_get: false,
                data: [],
                message: "login facebook sukses"
            })
            // dispatch({type: 'HOME'})
        })
    }
}

export function actRegister(params) {
    console.log(params)
    return dispatch => {
        Api._POST('auth/register', params)
            .then((response) => {
                dispatch({
                    type: "REGISTER",
                    status_add: response.data.status,
                    message: response.data.message,
                    data: response.data.result
                })
                console.log(response)
            }).catch(err => {
            dispatch({
                type: "REGISTER",
                status_add: false,
                message: "",
                data: []
            })
            console.log(err)

        })
    }

}