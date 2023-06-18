import {Schema, model} from 'mongoose'
import Post from '@/resources/post/post.interface' // using the module-alias is optional could use ./post.interface instead

const PostSchema = new Schema(
   {
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
   },
   {collection:'posts'},
);
export default model<Post>('Post', PostSchema);