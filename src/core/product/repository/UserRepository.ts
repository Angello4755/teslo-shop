import User from '../../../infra/database/auth/models/User';

export default interface UserRepository {
    getUserAuthenticate(email: string, password: string): Promise<any>;
    registerUser(name:string, email: string, password: string): Promise<any>;
    validateToken(token:string): Promise<any>;
}