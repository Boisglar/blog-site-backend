import mongoose from 'mongoose';

const CommentShema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      require: true,
    },
  },
  {
    timeseries: true,
  },
);

export default mongoose.model('Comment', CommentShema);
