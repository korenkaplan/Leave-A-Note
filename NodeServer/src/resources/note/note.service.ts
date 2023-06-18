import NoteModel from '@/resources/note/note.model';
import IAccident from '@/resources/accident/accident.interface';
import HttpException from '@/utils/exceptions/http.exception';
import IUser from '@/resources/user/user.interface';
import UserService from '../user/user.service';
class NoteService {
    private note = NoteModel;
    private user = new UserService();
    private async addNoteToUserMessages(accident: IAccident,damagedUser: IUser):Promise<boolean | Error>{
        try {
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
    public async addNote(damage_user_id: string, hitting_user_car: string,hitting_user_phone: string,hitting_user_name: string, imageSource: string ):Promise<boolean | Error>{
        try {
            //find the damaged user by id
           // const damagedUser: IUser | null = await this.user.findById(new Types.ObjectId('648f447388cf8e6657912c2d'));
            const damagedUser: IUser | null = await this.user.getUserById(damage_user_id);
            
            if(!damagedUser){return false;}
  
           // create the accident object
           const accidentData: IAccident = {
            hittingDriver: {
                name: hitting_user_name,
                carNumber: hitting_user_car,
                phoneNumber: hitting_user_phone,
            },
            date:this.formatDate(),
            imageSource: imageSource,
            type: 'note',
            isAnonymous: false,
            isIdentify: false,
            reporter: undefined,
        };
            //add the note to the user messages and accidents
          return await this.addNoteToUserMessages(accidentData,damagedUser);
        } catch (error: any) {
            throw new Error('addNote: ' + error.message);
        }
    }
    private  formatDate(): string {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear()).slice(-2);
        const formattedDate = `${day}/${month}/${year}`;
        
        console.log(formattedDate); // Output: 18/06/23
        return formattedDate;        
    }
    
}    
export default NoteService;



