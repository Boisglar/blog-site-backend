import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'Палоль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'Палоль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите Имя ').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Видите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Ввидите текст статьи').isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображения').optional().isString(),
];
