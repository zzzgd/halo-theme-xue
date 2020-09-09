import { OPTIONS, POST_LIST } from './constants';

const initialState = {
  options: [],
  postList: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPTIONS:
      return {
        ...state,
        options: action.payload,
      };
    case POST_LIST:
      return {
        ...state,
        postList: action.payload,
      };
    default:
      return state;
  }
};
