import ReportModel from '@/resources/report/report.model';
import IUser from '@/resources/user/user.interface';
import UserService from '@/resources/user/user.service';
import UserModel from '@/resources/user/user.model';
import IAccident from '@/resources/accident/accident.interface';
import NoteService from '@/resources/note/note.service';
class ReportService {
    private report = ReportModel;
    private NoteService = new NoteService();
    private UserService = new UserService()
      public async addReport(damagedCarNumber: string, hittingCarNumber: string,isAnonymous: boolean,reporter: {name:string, phoneNumber:string}, imageUrl: string ):Promise<boolean | Error>{
        try {
            //find the users by car number
            const damagedUser: IUser | null = await this.UserService.getUserByCarNumber(damagedCarNumber);
            const hittingUser: IUser | null = await this.UserService.getUserByCarNumber(hittingCarNumber);
             if(hittingUser && damagedUser) // IF BOTH DRIVERS WAS FOUND IN THE SYSTEM...
             {
                const accidentData: IAccident = {
                    hittingDriver: {
                        name: hittingUser.name,
                        carNumber: hittingUser.carNumber,
                        phoneNumber: hittingUser.phoneNumber,
                    },
                    date:this.NoteService.formatDate(),
                    imageSource: imageUrl,
                    type: 'report',
                    isAnonymous: isAnonymous,
                    isIdentify: true,
                    reporter:{
                        name: reporter.name,
                        phoneNumber: reporter.phoneNumber
                    }
                };
                await this.UserService.addMessageToUser(accidentData,damagedUser)
             }
            else if(!hittingUser && damagedUser) // if hitting driver is not found use the car number from data.
            {
                const accidentData: IAccident = {
                    hittingDriver: {
                        carNumber: hittingCarNumber,
                    },
                    date:this.NoteService.formatDate(),
                    imageSource: imageUrl,
                    type: 'report',
                    isAnonymous: isAnonymous,
                    isIdentify: true,
                    reporter:{
                        name: reporter.name,
                        phoneNumber: reporter.phoneNumber
                    }
                };
                await this.addReportToUserMessages(accidentData,damagedUser);
            }
            else if(hittingUser && !damagedUser){ // add to unmatched reports with known driver
                const accidentData: IAccident = {
                    hittingDriver: {
                        name: hittingUser.name,
                        carNumber: hittingUser.carNumber,
                        phoneNumber: hittingUser.phoneNumber,
                    },
                    date:this.NoteService.formatDate(),
                    imageSource: imageUrl,
                    type: 'report',
                    isAnonymous: isAnonymous,
                    isIdentify: true,
                    reporter:{
                        name: reporter.name,
                        phoneNumber: reporter.phoneNumber
                    }
                };
                await this.addToUnmatchedReportsCollection(accidentData,damagedCarNumber)
            }
            else{// add to unmatched reports with unknown driver
                const accidentData: IAccident = {
                    hittingDriver: {
                        carNumber: hittingCarNumber,
                    },
                    date:this.NoteService.formatDate(),
                    imageSource: imageUrl,
                    type: 'report',
                    isAnonymous: isAnonymous,
                    isIdentify: true,
                    reporter:{
                        name: reporter.name,
                        phoneNumber: reporter.phoneNumber
                    }
                };
                await this.addToUnmatchedReportsCollection(accidentData,damagedCarNumber)
            }
            
        } catch (error) {
            
        }
      };
      private addToUnmatchedReportsCollection(accident: IAccident,damagedCarNumber: string): Promise<boolean | Error>{

        //save the accident and the car number every sign up compare the car number to the reports on the list.
      };
}

export default ReportService;
