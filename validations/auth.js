import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'неверный формат почты').isEmail(),
  body('password', 'Палоль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullname', 'Укажите Имя ').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];
