import { Router } from 'express';
import api from '../services/api';

const posts = Router();

posts.get('/posts/:userId*?', async (req, res) => {
  try {
    const posts = (await api.get('/posts')).data;

    const userId = req.params.userId;

    if (userId) {
      const filted = posts.filter((post) => post.userId == userId);
      return res.json(filted);
    }

    return res.json(posts);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send('internal server error');
  }
});

export default posts;
