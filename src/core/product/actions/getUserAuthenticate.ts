import UserRepository from '../repository/UserRepository';

export default class GetUserAuthenticate {

    private userRepository: UserRepository;


    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email:string, password: string): Promise<any> {
        return this.userRepository.getUserAuthenticate(email, password);
    }

        
}