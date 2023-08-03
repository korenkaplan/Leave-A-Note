export interface RegisteredUsersPerMonthAmount {
  month: string,
  users: number,
  label?: string,
}
export interface searchCarNumberDto {
  deviceToken: string,
  id: string,
}
export interface IModalButton {
  title: string,
  navigateTo?: string
}
export interface DistributionOfReports {
  category: 'Notes' | 'Reports' | 'Unmatched \n Reports';
  count: number;
}
export interface IHttpResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
  tokenError?: boolean;
}
//the interface for a theme
export interface Theme {
  colors:
  {
    primary: string;
    secondary: string;
    background: string;
    text: {
      primary: string;
      secondary: string;
    }
  },
  fonts:
  {
    regular: string;
    bold: string;
  },

}
export interface IButtonTheme {
  buttonMain: {
    background: string;
    text: string;
  },
  buttonAlt: {
    background: string;
    text: string;
  },
}
export interface StyleButton {
  background: string;
  text: string;
}
export interface MessageProps {
  // Define your component props here
  route:
  {
    params:
    {
      item: Accident;
    };
  };
};
export interface IText {
  primary: string;
  secondary: string;
}
// the interface of a connected user.
export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  carNumber: string;
  role: string;
  unreadMessages: Accident[];
  accidents: Accident[];
  deviceToken: string;
}
export interface PartialUserDataForAccident {
  _id: string;
  name: string;
  phoneNumber: string;
  carNum: string;
}
//The interface of a report to send out by the connected user
export interface ReportToSend {
  imageUrl: string;
  damagedCarNumber: string;
  hittingCarNumber: string;
  isAnonymous: boolean;
}
//The interface of a note to send out by the connected user
export interface NoteToSend {
  damagedUserId: string;
  imageSource: string;
}
//the structure for a new user to sign up. before adding the new empty arrays(notes , reports , unread messages)
export interface SignUpFormValues {
  email: string;
  password: string;
  repeatPassword?: string;
  phoneNumber: string;
  carNumber: string;
  name: string;
}

// only the information of the user to be updated not including the notes and reports arrays.
export interface UserDataToUpdate {
  name: string;
  email: string;
  phoneNumber: string;
  carNumber: string;
}
//The interface that holds the properties of both Note and Report.
export interface Accident {
  id: string;
  hittingDriver: {
    name?: string;
    carNumber: string;
    phoneNumber?: string;
  };
  createdAt: Date;
  date: string;
  imageSource: string;
  type: 'report' | 'note';
  isAnonymous?: boolean;
  isIdentify?: boolean;
  reporter?: {
    name: string;
    phoneNumber: string;
  };
  isRead: boolean; 
}
export interface Token {
  exp: number;
  iat: number;
  id: string;
}