import HttpService from "./http-service";

export default class ActorService extends HttpService{
    static async addActor(actorData, token, ){
        const response = await this.client.request({
            url: '/admin/add-actor',
            method: 'POST',
            data: actorData,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        console.log('actor service', response);
        return response;
    }

    static async getActors(page = 1){
        const response = await this.client.request({
            url: `/actors`,
            method: 'GET',
            params: {
                page
            }
        });

        console.log('actor service get actors', response);
        return response;
    }

    static async getActor(id, page = 1){
        const response = await this.client.request({
            url: `/actors/${id}`,
            method: 'GET',
            params: {
                page
            }
        });

        console.log('actor service get actor', response);
        return response;
    }

    static async getActorsData(){
        const response = await this.client.request({
            url: '/get-actors-data',
            method: 'GET'
        });

        console.log('actor service get actors data', response);
        return response;
    }

    static async getActorData(id){
        const response = await this.client.request({
            url: `/get-actor-data/${id}`,
            method: 'GET',
        });

        console.log('actor service get actor data', response);
        return response;
    }

    static async editActor(id, actorData, token){
        const response = await this.client.request({
            url: `/admin/edit-actor/${id}`,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: actorData
        });

        console.log('actor service edit actor', response);
        return response;
    }

    static async deleteActor(id, token, userId){
        const response = await this.client.request({
            url: `/admin/delete-actor/${id}`,
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                userId
            }
        });

        console.log('actor service delete actor', response);
        return response;
    }
}