import UserRepository from '../../../../core/product/repository/UserRepository';
import tesloApi from '../api/tesloApi';

export class RepositoryUsersInMongo implements UserRepository {
    async validateToken(token: string): Promise<any> {
        try {
            const { data } = await tesloApi.post('/user/validate-token', { token});
            return data;
           } catch (error) {
            return Promise.resolve({ error: 'error'});
           }
    }
    async registerUser(name: string, email: string, password: string): Promise<any> {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password});
            return data;
           } catch (error) {
            return Promise.resolve({ error: 'error'});
           }
    }
    async getUserAuthenticate(email: string, password: string): Promise<any> {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password});
            return data;
        } catch (error) {
            return Promise.resolve({ error: 'error'});
        }
    }
}