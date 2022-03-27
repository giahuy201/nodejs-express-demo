// middleware là 1 function

module.exports = function(req, res, next) {
    // variable res.locals can be used anywhere has ?_sort&_col=${col}&_type=${type}
    res.locals._sort = {
        enabled: false,
        type: 'default',
        
    };

    if(req.query.hasOwnProperty('_sort')){
        res.locals._sort= {
            ...res.locals._sort,
            type : req.query._type,
            col : req.query._col
        }
    }
    next();
}