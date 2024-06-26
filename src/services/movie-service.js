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

    static async getSingleMovieData(id){
        const response = await this.client.request({
            url: `/get-movie-data/${id}`,
            method: 'GET',
        });

        console.log('movie service get movie data', response);
        return response;
    }

    static async editMovie(id, movieData, token){
        const response = await this.client.request({
            url: `/admin/edit-movie/${id}`,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: movieData
        });

        console.log('movie service edit movie', response);
        return response;
    }

    static async deleteMovie(id, token, userId){
        const response = await this.client.request({
            url: `admin/delete-movie/${id}`,
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

    static async addToWatchlist(movieId, userId, token){
        const response = await this.client.request({
            url: '/add-to-watchlist',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                movieId,
                userId
            }
        });

        console.log('movie service add to watchlist', response);
        return response;
    }

    static async getWatchlist(userId, token, page = 1){
        const response = await this.client.request({
            url: '/watchlist',
            method: 'POST',
            params: {
                page
            },
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                userId
            }
        });

        console.log('movie service get watchlist', response);
        return response;
    }

    static async markAsWatched(userId, movieId, token){
        const response = await this.client.request({
            url: '/mark-as-watched',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                userId,
                movieId
            }
        });

        console.log('movie service mark as watched', response);
        return response;
    }

    static async getWatchedMovies(userId, token){
        const response = await this.client.request({
            url: '/watched-movies',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                userId
            }
        });

        console.log('movie service get watched movies', response);
        return response;
    }

    static async addRating(rating, userId, movieId, token){
        const response = await this.client.request({
            url: '/add-rating',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                rating,
                userId,
                movieId
            }
        });

        console.log('movie service add rating', response);
        return response;
    }
}