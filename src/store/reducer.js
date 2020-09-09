import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';
import HomeReducer from 'pages/containers/Home/reducer';
import PostReducer from 'pages/containers/Post/reducer';
import archivesReducer from 'pages/containers/Archives/reducer';
import linksReducer from 'pages/containers/Links/reducer';
import sheetReducer from 'pages/containers/Sheet/reducer';
import journalsReducer from 'pages/containers/Journals/reducer';
import tagReducer from 'pages/containers/Tag/reducer';
import categoryReducer from 'pages/containers/Category/reducer';
import tagsReducer from 'pages/containers/Tags/reducer';
import categoriesReducer from 'pages/containers/Categories/reducer';
import searchReducer from 'pages/containers/Search/reducer';
import photoReducer from 'pages/containers/Photo/reducer';
import commentReducer from 'components/Comments/reducer';

const combinedReducer = combineReducers({
  router: routerReducer,
  home: HomeReducer,
  post: PostReducer,
  comment: commentReducer,
  archives: archivesReducer,
  journals: journalsReducer,
  links: linksReducer,
  sheet: sheetReducer,
  tag: tagReducer,
  category: categoryReducer,
  tags: tagsReducer,
  categories: categoriesReducer,
  photo: photoReducer,
  search: searchReducer,
});

export default combinedReducer;
