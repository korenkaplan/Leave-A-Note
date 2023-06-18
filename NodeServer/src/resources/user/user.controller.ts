import {Router,Request,Response,NextFunction} from 'express';
import IController  from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import IUser from './user.interface';
class UserController implements IController {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post(`${this.path}/register`,validationMiddleware(validate.register),this.register);
        this.router.post(`${this.path}/login`,validationMiddleware(validate.login),this.login);
        this.router.get(`${this.path}/GetUserByCarNumber/:carNumber`, validationMiddleware(validate.carSearch), this.GetUserByCarNumber);
        this.router.get(`${this.path}`,authenticated,this.getUser);
    }
    private register = async (req:Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {name, email, password, carNumber, phoneNumber} = req.body;
            const token = await this.UserService.register(name,email,carNumber, phoneNumber,password,'user');
            res.status(200).json({token})

        } catch (error: any) {
         next(new HttpException(400,'Register function:' + error.message))   
        }
    };
    private GetUserByCarNumber = async (req:Request, res: Response, next: NextFunction): Promise<Response | void> =>{
   try {
    const {carNumber} =req.params;
    const user = await this.UserService.getUserByCarNumber(carNumber);
    res.status(200).json({user});
   } catch (error: any) {
    next(new HttpException(400,'GetUserByCarNumber function:' + error.message))   
   }
    }
    private login = async  (req:Request, res: Response, next: NextFunction): Promise<Response | void> =>{
       try {
        const {email,password} = req.body;

        const token = await this.UserService.login(email,password);
        return res.status(200).json({token});
       }  catch (error: any) {
        next(new HttpException(400,error.message))   
       }
    };
    private getUser = async  (req:Request, res: Response, next: NextFunction): Promise<Response | void> =>{
    if(!req.user ){
    return next(new HttpException(404,' No logged in user'))
    }
    res.status(200).json({user: req.user})
    }

};
export default UserController;