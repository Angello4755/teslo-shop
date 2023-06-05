import { oAuthToDbUser } from 'src/infra/database/auth/hooks/oAUthToDbUser';

export default class OAUthToDbUser {
    async execute(oAuthEmail: string, oAuthName: string): Promise<any> {
        return await oAuthToDbUser(oAuthEmail, oAuthName);
    }        
}