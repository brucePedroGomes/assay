import express from 'express';
import users from './routes/users';
import posts from './routes/posts';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(users);
app.use(posts);

const port = 3333;

app.listen(3333, () => console.log(`server started on port ${port}`));
