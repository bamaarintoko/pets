import axios from "axios";
import {host} from "../../Utils/Api";

export function actAddReserve(params,img) {
    return dispatch => {
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        const data = new FormData();
        data.append('par_image_count',img.length)
        console.log(img)
        img.map((v,k)=>{
            data.append('par_image_'+k, {
                uri: v.uri,
                type: v.type !== null ? v.type : 'image/jpeg', // or photo.type
                name: v.fileName
            });
        })
        data.append('par_title', params.par_title)
        data.append('par_kategory', params.par_kategory)
        data.append('par_description', params.par_description)
        data.append('par_note', params.par_note)
        data.append('par_reserve_name', params.par_reserve_name)
        data.append('par_reserve_cp', params.par_reserve_cp)
        data.append('par_address', params.par_address)
        data.append('par_province', params.par_province)
        data.append('par_district', params.par_district)
        data.append('par_sub_district', params.par_sub_district)
        data.append('par_end_date', params.par_end_date)
        data.append('par_create_by', params.par_create_by)

        axios.post(host + 'reserve/add_reserve', data, config)
            .then((response) => {
                dispatch({
                    type:'ADD_RESERVE',
                    status_add:response.data.status,
                    message:response.data.message,
                    data:[]
                })
                console.log(response)
            }).catch(error => {
                dispatch({
                    type:'ADD_RESERVE',
                    status_add:false,
                    message:error.message,
                    data:[]
                })
            console.log(error)
        })
    }
}