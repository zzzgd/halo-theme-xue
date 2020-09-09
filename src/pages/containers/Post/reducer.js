import { MENU_LIST, OPTIONS, POST_CONTENT, SETTINGS, USER_PROFILE } from './constants';

const initialState = {
  options: [],
  settings: {},
  postContent: {},
  userProfile: {},
  menus: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPTIONS:
      return {
        ...state,
        options: action.payload,
      };
    case SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case POST_CONTENT:
      return {
        ...state,
        postContent: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case MENU_LIST:
      return {
        ...state,
        menus: action.payload,
      };
    default:
      return state;
  }
};
