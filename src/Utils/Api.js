import axios from 'axios'
import qs from 'qs'

// const host      = "http://192.168.100.4/erp/public/api/";
// const host      = "http://erp.mlskoding.com/api/";
export const host      = "http://debu.mlskoding.com/api/";


export default class Api {
    static POST(end_point,params){

        const url = `${host}${end_point}`;
        return url;
        // const config = {
        //     headers: {'Authorization': 'Bearer birds flyy south'}
        // };
        //let token = {token:'qweweqwe'}
        //console.log((token));
        //console.log((config));

        // const a = {
        //     ...params,
        //     ...token
        // }
        //console.log(a);
        // return axios.post(url,qs.stringify(params))
        return axios.post(url,qs.stringify(params))
    }

    static GET(end_point){
        const url = `${host}${end_point}`;
        return axios.get(url)
            .then(response=>{return response})
            .catch(error=>{console.log(error)})
    }
    static _POST(end_point,params){
        const url = `${host}${end_point}`;
        return axios.post(url,qs.stringify(params))
    }
    // }
}