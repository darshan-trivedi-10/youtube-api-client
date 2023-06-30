import axios from "axios";

const baseURL = 'http://localhost:5000/api/v1'

const API = axios.create({ baseURL: baseURL });

export const fetchData = async (page) => {
    try {
        let data = await API.get(`/videos/search/${page}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const searchVideo = async (keyword) => {
    try {
        let data = await API.get(`/videos/search?q=${keyword}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const stopFetchingVideos = async () => {
    try {
        let response = await API.post('/youtube/stop');
        return response;
    } catch (error) {
        console.log(error);
    }
}