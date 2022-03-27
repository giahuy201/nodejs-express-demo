const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function routes(app) {
    app.use('/news', newsRouter);

    app.use('/courses', coursesRouter);

    app.use('/me', meRouter);

    app.use('/', siteRouter);

    /* news in newsRouter
    app.get('/news', (req, res) => {
      res.render('news.hbs');
    });
*/

    /* home and search in siteRouter
    app.get('/', (req, res) => {
        res.render('home.hbs');
    });
    
    app.get('/search', (req, res) => {
     
      res.render('search.hbs');
    });
    
    app.post('/search', (req, res) => {
      console.log(req.body)
      res.send('search');
    });
    */
}

module.exports = routes;
