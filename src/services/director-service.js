import HttpService from "./http-service";

export default class DirectorService extends HttpService{
    static async addDirector(directorData, token){
        const response = await this.client.request({
            url: '/admin/add-director',
            method: 'POST',
            data: directorData,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        console.log('director service', response);
        return response;
    }

    static async getDirectors(){
        const response = await this.client.request({
            url: '/get-directors',
            method: 'GET'
        });

        console.log('director service get directors', response);
        return response;
    }

    static async getDirector(id, page = 1){
        const response = await this.client.request({
            url: `/directors/${id}`,
            method: 'GET',
            params: {
                page
            }
        });

        console.log('director service get director', response);
        return response;
    }
}