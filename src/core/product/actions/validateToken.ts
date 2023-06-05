import UserRepository from '../repository/UserRepository';

export default class ValidateToken {

    private userRepository: UserRepository;


    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(token:string): Promise<any> {
        return this.userRepository.validateToken(token);
    }        
}