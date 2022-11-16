import axios from 'axios';

const API_URL = axios.create({baseURL:'http://bus-load-balancer-613811160.ap-south-1.elb.amazonaws.com:8081/api'});



const createBooking = (data) => {
    console.log(data);
    return API_URL.post("/booking",data);
    
};



export default {
    createBooking
}