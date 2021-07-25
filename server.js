//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
require('dotenv').config()
const List = require('./models/lists.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//___________________
// Routes
//___________________
//localhost:3000
app.get('/index' , (req, res) => {
  List.find({}, (error, allLists)=>{
    res.render(
      'index.ejs',
      {
        lists: allLists
      }
     );
  })
});

app.get('/index/new', (req, res)=>{
  res.render('new.ejs')
})



app.post('/index', (req, res)=>{
  List.create(req.body, (error, createdList)=>{
  res.redirect('/index')
})
})


app.get('/index/:id/edit', (req, res)=>{
  List.findById(req.params.id, (error, foundList)=>{
    res.render(
      'edit.ejs',
      {
        list:foundList
      })
  })
})


app.put('/index/:id', (req, res)=>{
  List.findByIdAndUpdate(req.params.id, req.body, (error, updatedList)=>{
    res.redirect('/index')
  })
})

app.get('/index/:id', (req, res)=>{
  List.findById(req.params.id, (error, foundList)=>{
    res.render('show.ejs',
      {
        lists:foundList
      })
  })
})

app.get('/index/seed', (req, res)=>{
  List.create(
    [
      {
        task: 'visit my friend',
        time: 13
      },
      {
        task: 'Go Sleep',
        time: 10
      },
      {
        task: 'eat',
        time: 12
      }
    ],
    (error, data)=>{
      res.redirect('/index')
    }
  )
})

app.delete('/index/:id', (req, res)=>{
  List.findByIdAndRemove(req.params.id, (error, data)=>{
    res.redirect('/index')
  })
})



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
