import UserModel from "@/resources/user/user.model";
import token from "@/utils/token";

class UserService {
    private user = UserModel;
    /**
     * Register a new user
     */
    public async register(name: string, email: string, password: string,role: string): Promise<string | Error> {
        try {
            const user = await this.user.create({name, email, password, role});
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error: any) {
            throw new Error('register service: ' + error.message);
        }
    };
    
     /**
     * Attempt to login a user
     */
    public async login(email: string, password: string): Promise<string | Error> {
        try {

            //search for a user with this email in the database
            const user = await this.user.findOne({email});
            if(!user){ //if not found
                throw new Error('User not found with email: ' + email);
            }
            
            //if found validate the password , else throw and error that the credentials are incorrect
            if(await user.isValidPassword(password)){
                return token.createToken(user);
            }else{
                throw new Error('Wrong credentials were provided')
            }
        } catch (error: any) {
            throw new Error('Unable to login: ' + error.message);     
        }
    };
};
export default UserService;