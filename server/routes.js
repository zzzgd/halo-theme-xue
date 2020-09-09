const routes = require('next-routes');

module.exports = routes()
  .add('home', '/', 'containers/Home')
  .add('post', '/post/:id', 'containers/Post')
  .add('slugPost', '/archives/:slug', 'containers/Post')
  .add('datePost', '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})?/:slug', 'containers/Post')
  .add('links', '/links', 'containers/Links')
  .add('sheet', '/s/:slug', 'containers/Sheet')
  .add('tag', '/tag/:slug', 'containers/Tag')
  .add('tags', '/tags', 'containers/Tags')
  .add('photo', '/photo', 'containers/Photo')
  .add('category', '/category/:slug', 'containers/Category')
  .add('categories', '/categories', 'containers/Categories')
  .add('journals', '/journals', 'containers/Journals')
  .add('search', '/search', 'containers/Search')
  .add('archives', '/archives', 'containers/Archives');
