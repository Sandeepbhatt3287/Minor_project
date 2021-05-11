const express = require('express');
// const { time } = require('node:console');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
// adding middleware
app.use(express.urlencoded()); 

app.use(express.static('assets'));

var todoList =[]

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

app.post('/create-todo',function(req,res){
    Todo.create({
        description :req.body.description,
        category:req.body.category,
        date: req.body.date
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

