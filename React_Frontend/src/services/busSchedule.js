import axios from 'axios';

const API_URL = axios.create({baseURL:'http://bus-load-balancer-613811160.ap-south-1.elb.amazonaws.com:8080/api'});

const getBusSchedules = (id) => {
    return API_URL.get(`/schedule/bus/${id}`);
};

const getAllBusSchedules = () => {
    return API_URL.get(`/schedule`);
};

const addBusSchedule = async (data) => {
    return await API_URL.post(`/schedule`,data);
}

const deleteOneSchedule = (id) => {
    return API_URL.delete(`/schedule/${id}`);
}
const searchSchedule = async (data) => {
    console.log(data);
    return await API_URL.post(`/schedule/search`,data);
}

export default {
    getBusSchedules, getAllBusSchedules,addBusSchedule,deleteOneSchedule,searchSchedule
}