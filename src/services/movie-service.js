import HttpService from "./http-service";

export default class MovieService extends HttpService{
    static async addMovie(movieData){
        const response = await this.client.request({
            url: '/admin/add-movie',
            method: 'POST',
            data: movieData
        });

        console.log('movie service', response);
        return response;
    }

    static async getMovies(){
        const response = await this.client.request({
            url: '/movies',
            method: 'GET',
        });

        console.log('movie service', response);
        return response;
    }
}