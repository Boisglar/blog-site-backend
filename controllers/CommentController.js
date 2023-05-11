import CommentModel from '../models/Comment.js';

export const getAll = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate('user');
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить коменты ',
    });
  }
};
export const getCommentByPost = async (req, res) => {
  try {
    const comments = await CommentModel.find({
      postId: req.params.id,
    }).populate('user');
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'не удалось получить статьи по id поста',
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new CommentModel({
      user: req.userId,
      text: req.body.text,
      postId: req.body.postId,
    });
    const comment = await (await doc.save()).populate('user');
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'не удалость добавить комментарий',
    });
  }
};
