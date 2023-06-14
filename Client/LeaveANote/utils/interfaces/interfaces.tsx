/* eslint-disable prettier/prettier */
 // the interface of a connected user.
export interface User {
    id:string;
    fullname: string;
    email: string;
    phoneNumber: string;
    carNum: string;
    unreadMessages: Accident[];
    notes: Accident[];
    reports: Accident[];
  }

 //The interface of a report to send out by the connected user
  export interface ReportToSend {
    imageUrl: string;
    damagedCarNumber:string;
    hittingCarNumber: string;
    date:string;
    isAnonymous: boolean;
  }
  //The interface of a note to send out by the connected user
  export interface NoteToSend {
    damagedCarNumber: string;
    imageSource: string;
    date: string;
  }
  //the structure for a new user to sign up. before adding the new empty arrays(notes , reports , unread messages)
  export interface SignUpFormValues {
    email: string;
    password: string;
    repeatpassword: string;
    phoneNumber: string;
    carNumber: string;
    fullName: string;
  }

  // only the information of the user to be updated not including the notes and reports arrays.
  export interface UserDataToUpdate{
    fullname: string;
    email: string;
    phoneNumber: string;
    carNum: string;
  }
  //The interface that holds the properties of both Note and Report.
export interface Accident {
  id: string;
  hittingDriver: {
    name?: string;
    carNumber: string;
    phoneNumber?: string;
  };
  date: string;
  imageSource: string;
  type: 'report' | 'note';
  isAnonymous?: boolean;
  isIdentify?: boolean;
  reporter?: {
    name: string;
    phoneNumber: string;
  };
}
