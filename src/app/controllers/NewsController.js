class NewsController {
    // GET/news
    index(req, res) {
        res.render('news');
    }

    showNews(req, res) {
        console.log(req.query);
        res.send('news detail');
    }
}

module.exports = new NewsController();
