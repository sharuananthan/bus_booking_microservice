import axios from 'axios';

const API_URL = axios.create({baseURL:'http://bus-load-balancer-613811160.ap-south-1.elb.amazonaws.com:8080/api'});



const getAllBuses = () => {
    return API_URL.get('/bus');
    
};

const addBus = (data) => {
    return API_URL.post('/bus',data);
}

const deleteBus = (id) => {
    return API_URL.delete(`/bus/${id}`);
}

const editBus = (id,data) => {
    return API_URL.put(`/bus/${id}`,data);
}

export default {
    getAllBuses, addBus, deleteBus,editBus
}