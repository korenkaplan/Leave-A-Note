import UserModel from "@/resources/user/user.model";
import token from "@/utils/token";
import {IAccident} from "@/resources/accident/accident.interface";
import IUser from '@/resources/user/user.interface'
import { FilterQuery, ProjectionFields, Types  } from "mongoose";
class UserService {
    private user = UserModel;
    /**
     * Register a new user
     */
    public async register(name: string, email: string,carNumber: string,phoneNumber: string, password: string,role: string ): Promise<string | Error> {
        try {
            const user = await this.user.create({ name, email, password,phoneNumber,carNumber, role, accidents: [], unreadMessages: [] });
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
    public async addMessageToUser(accident: IAccident,damagedUser: IUser):Promise<boolean | Error>{
        try {

        // Set the _id field of the accident object to the generated ObjectId
           accident._id = new Types.ObjectId();
            //add to user messages
           damagedUser.accidents.push(accident);
           
           damagedUser.unreadMessages.push(accident);
           await damagedUser.save();
           console.log('saved successfully');
            return true;
        } catch (error: any) {
            throw new Error('addNoteToUserMessages: ' + error.message);
        }
    };
    public async GetUserQuery(query: FilterQuery<IUser>= {}, projection: ProjectionFields<IUser>= {}): Promise<IUser | null> {
        try {
          const user = await this.user.findOne(query, projection);
          return user;
        } catch (error: any) {
          throw new Error('getUserByCarNumber service: ' + error.message);
        }
      }
};
export default UserService;