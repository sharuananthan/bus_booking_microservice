import axios from 'axios';

const API_URL = axios.create({baseURL:'http://bus-load-balancer-613811160.ap-south-1.elb.amazonaws.com:8080/api'});
const Customer_URL = axios.create({baseURL:'http://bus-load-balancer-613811160.ap-south-1.elb.amazonaws.com:8082/api'});

const loginAdmin= (data) => {
    return API_URL.post('/admin',data);
}


const loginCustomer= (data) => {
    return Customer_URL.post('/customer/login',data);
}
const createCustomer= (data) => {
    return Customer_URL.post('/customer/register',data);
}


export default {
    loginAdmin,loginCustomer, createCustomer
}