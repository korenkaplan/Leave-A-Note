import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import UserController from '@/resources/user/user.controller';
import NoteController from '@/resources/note/note.controller';
validateEnv();
const app = new App([ new UserController(), new NoteController()],Number(process.env.PORT));
app.listen();