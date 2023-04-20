import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'не удалость получить статью',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
    ).populate('user');

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена ',
      });
    }

    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'не удалось создать статью',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const doc = await PostModel.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({
        message: 'статья ненайдена ',
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалость удалить статью',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndUpdate(postId, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить статью ',
    });
  }
};

export const getLastTegs = async (req, res) => {
  try {
    const post = await PostModel.find().limit(5).exec();
    const tags = post
      .map((item) => item.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить теги',
    });
  }
};
