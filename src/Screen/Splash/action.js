import Api from "../../Utils/Api";

export function actGetSetting() {
    return dispatch =>{
        Api._POST('setting/setting')
            .then((response)=>{
                dispatch({
                    type : 'SETTING',
                    status_get : response.data.status,
                    message : response.data.message,
                    data : response.data.result
                })
            }).catch((err)=>{
                dispatch({
                    type : 'SETTING',
                    status_get : false,
                    message : err.message,
                    data : []
                })
        })
    }
}