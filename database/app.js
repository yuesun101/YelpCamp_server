var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cats_app", {useMongoClient: true});

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   others: String
});

var Cat = mongoose.model('Cat',catSchema);

Cat.create({
    name: 'YiSu',
    age: 20,
    others:'female'
}, function(err,cat){
    if (err){
        console.log('There were something went wrong');
    }else{
        console.log('A cat has beem added');
        console.log(cat);
    }
});

Cat.find({},function(err,cats){
    if (err){
        console.log('There were something went wrong');
    }else{
        console.log('All cats')
        console.log(cats);
    }
})