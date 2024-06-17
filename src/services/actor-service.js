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

    static async getActors(){
        const response = await this.client.request({
            url: '/get-actors',
            method: 'GET'
        });

        console.log('actor service get actors', response);
        return response;
    }
}