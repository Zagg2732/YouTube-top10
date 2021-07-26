//axios api 호출을 mixins 공통 함수로 만듦
import axios from "axios";

export default {
    methods : {
        async $api(url,method,params) {
            return (await axios({
                method: method,
                url,
                params
            }).catch(e => {
                console.log(e);
            })).data;
        }
    }
}