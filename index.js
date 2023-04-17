import express from 'express';

import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserCantroller from './controllers/UserController.js';

mongoose
  .connect('mongodb+srv://baisangur:Delb9851973@cluster0.yzeyrrz.mongodb.net/blog')
  .then(() => {
    console.log('DB OK');
  })
  .catch(() => {
    console.log('DB error');
  });
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello word');
});
app.get('/auth/me', checkAuth, UserCantroller.getMe);
app.post('/auth/login', UserCantroller.login);
app.post('/auth/register', registerValidation, UserCantroller.register);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server ok');
});
