import HttpService from "./http-service";

export default class AuthService extends HttpService{
    static async postSignup(signupData){
        const response = await this.client.request({
            url: '/signup',
            method: 'POST',
            data: signupData
        });

        console.log('auth service', response);
        return response;
    }

    static async postLogin(loginData){
        const response = await this.client.request({
            url: '/login',
            method: 'POST',
            data: loginData
        });

        console.log('auth service', response);
        return response;
    }

    static async getIsAdmin(userId){
        const response = await this.client.request({
            url: '/get-is-admin',
            method: 'POST',
            data: {
                userId
            }
        });

        console.log('auth service', response);
        return response;
    }
}