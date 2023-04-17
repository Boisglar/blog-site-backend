import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from './validations/validations.js';
import { UserCantroller, PostController } from './controllers/index.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

mongoose
  .connect('mongodb+srv://baisangur:Delb9851973@cluster0.yzeyrrz.mongodb.net/blog')
  .then(() => {
    console.log('DB OK');
  })
  .catch(() => {
    console.log('DB error');
  });
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});
const uploads = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserCantroller.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserCantroller.register);
app.get('/auth/me', checkAuth, UserCantroller.getMe);

app.post('/upload', checkAuth, uploads.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server ok');
});
