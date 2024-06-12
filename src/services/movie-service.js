import HttpService from "./http-service";

export default class MovieService extends HttpService{
    static async addMovie(movieData, token){
        const response = await this.client.request({
            url: '/admin/add-movie',
            method: 'POST',
            data: movieData,
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        console.log('movie service', response);
        return response;
    }

    static async getMovies(page = 1){
        const response = await this.client.request({
            url: '/movies',
            method: 'GET',
            params: {
                page
            }
        });

        console.log('movie service', response);
        return response;
    }

    static async getSingleMovie(id){
        const response = await this.client.request({
            url: `/movies/${id}`,
            method: 'GET',
        });

        console.log('movie service single movie', response);
        return response;
    }

    static async deleteMovie(id, token, userId){
        const response = await this.client.request({
            url: `admin/movies/${id}`,
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                userId
            }
        });

        console.log('movie service delete movie', response);
        return response;
    }
}