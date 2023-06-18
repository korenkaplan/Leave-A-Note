import { Schema, model } from 'mongoose';
import Note from '@/resources/note/note.interface';

const NoteSchema = new Schema<Note>(
  {
    damaged_user_id: {
      type: String,
      required: true,
    },
    hitting_user_car: {
      type: String,
      required: true,
    },
    hitting_user_phone: {
      type: String,
      required: true,
    },
    hitting_user_name: {
      type: String,
      required: true,
    },
    imageSource: {
      type: String,
      required: true,
    },
  },
  {collection:'users'}
);

export default model<Note>('Note', NoteSchema);
