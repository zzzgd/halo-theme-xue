import { COMMENT, CREATE_COMMENT } from './constants';

const defaultState = {
  comments: {},
  postComment: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        postComment: action.payload,
      };
    default:
      return state;
  }
};
