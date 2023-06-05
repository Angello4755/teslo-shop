import { checkUserEmailPassword } from 'src/infra/database/auth/hooks/checkUserEmailPassword';
import UserRepository from '../repository/UserRepository';

export default class CheckUserEmailPassword {
    async execute(email: string, password: string): Promise<any> {
        return await checkUserEmailPassword(email, password);
    }        
}