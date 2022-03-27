const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
// mongoose_delete để xóa mềm
const mongoose_delete = require('mongoose-delete');

// AutoIncrement id in mongodb, AutoIncrement create table couters in mongodb
const AutoIncrement = require('mongoose-sequence')(mongoose);

// auto transfer :slug params string . ex: a b c => a-b-c
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {   
        _id: Number,
        name: String,
        description: String,
        image: { type: String, default: '' },
        slug: { type: String, slug: 'name', unique: true },
        level: { type: String, default: '' },
        videoId: { type: String, default: '' },
    },
    {   
        timestamps: true,
        _id: false
    },
);

// custom query helper method mongoose
CourseSchema.query.sortable = function(req){
    // this là danh sách dữ liệu = Courses trong meController

    if(req.query.hasOwnProperty('_sort')){
        const isValisType = ['asc', 'desc'].includes(req.query._type);
        return this.sort({
            [req.query._col] : (isValisType ? req.query._type : 'desc')
        });
    }
    return this;
}

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt : true });

module.exports = mongoose.model('Course', CourseSchema);
