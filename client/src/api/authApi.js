import axios from 'axios';


export const createUser = async (postBody)=>{
    try {
        let res = await axios.post(`http://localhost:8080/api/v1/user`,postBody);
        console.log(res);
        return res.data["status"]
    } catch (error) {
        console.log(`error is ::: ${error}`)
    }
};