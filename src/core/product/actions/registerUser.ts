import UserRepository from '../repository/UserRepository';

export default class RegisterUser {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(name: string, email:string, password: string): Promise<any> {
        return this.userRepository.registerUser(name, email, password);
    }   
}