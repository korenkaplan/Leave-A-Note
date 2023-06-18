import { Document } from 'mongoose';

export default interface Report extends Document {
    imageUrl: string;
    damagedCarNumber:string;
    hittingCarNumber: string;
    isAnonymous: boolean;
    reporter:{
        name:string;
        carNumber:string;
    }
};
