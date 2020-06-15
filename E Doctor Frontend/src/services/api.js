import axios from 'axios'

export default  axios.create({
   // baseURL: 'http://jsonplaceholder.kisim.eu.org/'
    baseURL: 'http://localhost:9000',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials:true
});
