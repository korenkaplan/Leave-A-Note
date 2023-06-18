import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'users' } // Merge options into a single object
);
    /**
     * Hash the user's password
     */
UserSchema.pre<User>('save', async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
});

    /**
     * Hash the input and then compare it to the hashed password in the database.
     */
UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean>{
    return await bcrypt.compare(password,this.password);
}
export default model<User>('User', UserSchema);
