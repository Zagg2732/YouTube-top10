//axios api 호출을 mixins 공통 함수로 만듦
import axios from "axios";

export default {
    methods : {
        async $api(url,method,data) {
            return (await axios({
                method: method,
                url,
                data
            }).catch(e => {
                console.log(e);
            })).data;
        }
    }
}