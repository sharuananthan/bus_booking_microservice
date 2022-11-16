import axios from 'axios';

const API_URL = axios.create({baseURL:'http://bus-load-balancer-613811160.ap-south-1.elb.amazonaws.com:8080/api/seat'});



const getSeatsForBusSchedule = (id) => {
    return API_URL.get(`/schedule/${id}`);
    
};



export default {
    getSeatsForBusSchedule
}