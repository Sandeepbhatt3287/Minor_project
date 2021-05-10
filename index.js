const express = require('express');
// const { time } = require('node:console');
const path = require('path');
const port = 7000;
const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
// adding middleware
app.use(express.urlencoded()); 

app.use(express.static('assets'));

var todoList =[
    {
        name:"home work",
        time:"10pm"
    },
    {
        name:"coding",
        time:"12pm"
    }
]

app.get('/',function(req,res){
    Todo.find({},function(err,todos){
        if (err){
            console.log('Error in fetcing Todo list from db');
            return;
        }
        return res.render('home',
        {
            title:" TODO list",
            todo_list:todos
        });
    });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"let us play with ejs"
    });
});

app.post('/create-todo',function(req,res){
    Todo.create({
        name :req.body.name,
        time: req.body.time
    },function(err,newTodo){
        if (err){console.log('error in creating a TODO list');
        
            return;}
            console.log('###',newTodo);
            return res.redirect('back');
    });
});

// for deleting a TODO list items

app.get('/delete-todo',function(req,res){
    // get the id from query i the url
    let id =req.query.id;

    // finding the TODO item in the database using id and delete it
    Todo.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from databse ');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port,function(err){
    if (err){console.log('Error in running the server',err);}
    console.log('yeah!!! my express server is running on port :',port);
});

