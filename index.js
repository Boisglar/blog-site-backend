import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from './validations/validations.js';
import { UserCantroller, PostController, CommentController } from './controllers/index.js';
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
app.use(cors());
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
app.get('/posts/:id', checkAuth, PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);
app.get('/tags', PostController.getLastTegs);

app.post('/comment', checkAuth, CommentController.create);
app.get('/comments', CommentController.getAll);
app.get('/comments/post/:id', CommentController.getCommentByPost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('server ok');
});
