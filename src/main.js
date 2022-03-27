const express = require('express');
const { engine } = require('express-handlebars');
const routes = require('./routes/index');
const path = require('path');
const db = require('./config/db');
const methodOverride = require('method-override');
const sortMiddleware = require('./app/middleware/sortMiddleware');
const helperHandleBars = require('./helper/handlebars');


//  check connect to mongodb
db.connect();

const app = express();

// custom sort middware in /me/stored/coures , nó dùng được ở bất anywhere khi không truyền https path,nếu định nghĩa path thì app.post('/abc', sortMiddleware); thì middleware chỉ sử dụng ở path này
app.use(sortMiddleware);

// chuyển post thành put chỉ cần thêm query param ?_method=PUT
app.use(methodOverride('_method'));

//sử lý middleware từ form method = post, method=get thì đã có middleware từ req.query
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// khi gửi từ js lên như fetch, axios, xmlHttps, ... thì xử dụng express.json
app.use(express.json());

//  dùng file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// path.join(__dirname, 'resouces', 'views') tên là tên thư mục cha chứa nó

// template engine handlebars : src/resouces/view
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        helpers: require('./helper/handlebars')
        // chuyển code helper vào helperHandleBars cho gọn code
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resouces', 'views'));

// routes : src/routes

routes(app);

// method next() mà có param thì sẽ lập tức tìm đến function middleware có 4 tham số (err, req, res, next), thường middleware này sẽ xử lý lỗi.
app.use((err, req, res, next) => {
    res.json({message: err.message})
})

app.listen(3000);
