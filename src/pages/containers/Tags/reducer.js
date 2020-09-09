import { MENU_LIST, OPTIONS, SETTINGS, TAG_LIST } from './constants';

const initialState = {
  options: [],
  settings: {},
  tagList: [],
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
    case TAG_LIST:
      return {
        ...state,
        tagList: action.payload,
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
