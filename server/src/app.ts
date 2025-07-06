import express, { Request, Response } from 'express';
import morgan from 'morgan';
import connectDB from './config/db';
import commentRouter from './routes/comment.routes';
import likeRouter from './routes/like.routes';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
}); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});