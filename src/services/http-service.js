import axios from "axios";

export default class HttpService{
    static client = axios.create({
        baseURL: 'http://localhost:8080'
    });
}