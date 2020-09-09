import { LINK_DATA, OPTIONS, SETTINGS, MENU_LIST } from './constants';

const initialState = {
  options: [],
  settings: {},
  linkList: [],
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
    case LINK_DATA:
      return {
        ...state,
        linkList: action.payload,
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
