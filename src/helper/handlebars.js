var Handlebars = require('handlebars');

/* 
    có 2 cách tạo handlebar helper
        c1 : truyền vào trong đối số của engine : helper : sort ()=>{return}
        c2 : dùng require('handlebars');
*/
module.exports =  {
    sum: (a, b) => a + b,
    sorted : (col, _sort) =>{
        // sort ở myCourses, chỉ hiển thị ra view còn logic xử lý ở me/stored/courses
    // để tránh lặp lại code nhiều lần và làm xấu ở view nên ta dùng helper handejs
    const check = col === _sort.col ? _sort.type : 'default';
    const icons = {
        default : 'caret-up-outline',
        asc : 'caret-up-outline',
        desc : 'caret-down-outline',
    }
    const types = {
        default : 'desc',
        asc : 'desc',
        desc : 'asc'
    }
    const icon = icons[check];
    const type = types[check];

    // đoạn này dùng để bảo vệ khỏi xss tấn công nhưng lại bị lỗi khi add library handlebars
   /* const href = Handlebars.escapeExpression('?_sort&_col=${col}&_type=${type}');
        const output = `   
        <a href="${href}" class="d-flex flex-column icon-elevator">
            <ion-icon name="${icon}"></ion-icon>
         </a>`
        return new HandleBars.SafeString(output);
        
        */
        return `<a href="?_sort&_col=${col}&_type=${type}" class="d-flex flex-column        icon-elevator">
        <ion-icon name="${icon}"></ion-icon>
        </a>`
    }
}