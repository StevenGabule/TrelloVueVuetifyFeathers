const mongoose = require('mongoose');

async function isBoardOwner(context) {
  const { boardId } = context.params.query || context.data;

  if (!boardId) {
    return context;
  }

  const {_id} = context.params.user;

  const boards = mongoose.model('boards');
  const board = await boards.findOne({ _id: boardId });

  if (board) {
    if (board.ownerId.toString() === _id.toString()) {
      return context;
    } else {
      return Promise.reject(new Error('Un-Authorized'));
    }
  }
  return context;
}

module.exports = { isBoardOwner };
