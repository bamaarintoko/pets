import Api, {host} from "../../Utils/Api";
import axios from "axios/index";

export function actGetListReserve(params) {
    return dispatch => {
        Api._POST('reserve/list_reserve_by_user', params)
            .then((response) => {
                dispatch({
                    type: "RESERVE_USER",
                    status_get: response.data.status,
                    message: response.data.message,
                    data: response.data.result
                })
            }).catch((err) => {
            dispatch({
                type: "RESET_RESERVE_USER",
                status_get: false,
                message: err.message,
                data: []
            })
        })
    }
}

export function actUpdateReserve(params,save,del) {
    return dispatch => {
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };
        const data = new FormData();
        data.append('par_image_delete',del)
        data.append('par_image_count',save.length)
        save.map((v,k)=>{
            data.append('par_image_'+k, {
                uri: v.uri,
                type: v.type !== null ? v.type : 'image/jpeg', // or photo.type
                name: v.fileName
            });
        })
        data.append('par_address', params.par_address)
        data.append('par_description', params.par_description)
        data.append('par_district', params.par_district)
        data.append('par_end_date', params.par_end_date)
        data.append('par_kategory', params.par_kategory)
        data.append('par_note', params.par_note)
        data.append('par_province', params.par_province)
        data.append('par_reserve_cp', params.par_reserve_cp)
        data.append('par_reserve_id', params.par_reserve_id)
        data.append('par_reserve_name', params.par_reserve_name)
        data.append('par_status', params.par_status)
        data.append('par_sub_district', params.par_sub_district)
        data.append('par_title', params.par_title)

        axios.post(host + 'reserve/update_reserve', data, config)
            .then((response) => {
                dispatch({
                    type: "UPDATE_RESERVE",
                    status_update: response.data.status,
                    message: response.data.message,
                    data: response.data.result
                })
            }).catch(error => {
            dispatch({
                type: "UPDATE_RESERVE",
                status_update: false,
                message: error.message,
                data: []
            })
        })
    }
}
