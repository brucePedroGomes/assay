import api from '../services/api';

import { Router } from 'express';

const users = Router();

users.get('/users/:id*?', async (req, res) => {
  try {
    const users = (await api.get('users')).data;

    const id = req.params.id;

    if (id) {
      return res.json(users.filter((user) => user.id == id));
    }

    return res.json(users);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send('internal server error');
  }
});

export default users;
