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

    static async getDirectors(page = 1){
        const response = await this.client.request({
            url: `/directors/`,
            method: 'GET',
            params: {
                page
            }
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

    static async getDirectorsData(){
        const response = await this.client.request({
            url: '/get-directors-data',
            method: 'GET'
        });

        console.log('director service get directors data', response);
        return response;
    }

    static async getDirectorData(id){
        const response = await this.client.request({
            url: `/get-director-data/${id}`,
            method: 'GET',
        });

        console.log('director service get director data', response);
        return response;
    }

    static async editDirector(id, directorData, token){
        const response = await this.client.request({
            url: `/admin/edit-director/${id}`,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: directorData
        });

        console.log('director service edit director', response);
        return response;
    }

    static async deleteDirector(id, token, userId){
        const response = await this.client.request({
            url: `/admin/delete-director/${id}`,
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                userId
            }
        });

        console.log('director service delete director', response);
        return response;
    }
}