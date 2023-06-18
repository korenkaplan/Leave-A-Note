import { Document } from 'mongoose';
import Accident from '@/resources/accident/accident.interface';

export default interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  carNumber: string;
  phoneNumber: string;
  role: string;
  accidents: Accident[]; // an array of Accident objects
  unreadMessages: Accident[]; // an array of Accident objects in inbox

  isValidPassword(password: string): Promise<Error | boolean>;
}
