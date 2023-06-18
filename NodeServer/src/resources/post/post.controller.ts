import {Router,Request,Response,NextFunction} from 'express';
import IController  from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';


class PostController implements IController {
    public path= '/posts';
    public router = Router();;
    private PostService = new PostService();;

    constructor(){
        this.initializeRoutes();
    };
    private initializeRoutes(): void{
        this.router.post(`${this.path}`,validationMiddleware(validate.create),this.create);
    };

    private create = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
        try {
            const {title, body} = req.body;

            const post = await this.PostService.create(title, body);
            res.status(201).json({post});
        } catch (error:any) {
            next(new HttpException(400,error.message));
            
        }
    };
};

export default PostController;