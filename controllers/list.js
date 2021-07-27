const express = require('express')
const router = express.Router()


const List = require('../models/lists.js')


router.get('/' , (req, res) => {
  List.find({}, (error, allLists)=>{
    res.render(
      'index.ejs',
      {
        lists: allLists
      }
     );
  })
});

router.get('/new', (req, res)=>{
  res.render('new.ejs')
})



router.post('/', (req, res)=>{
  List.create(req.body, (error, createdList)=>{
  res.redirect('/index')
})
})




router.put('/:id', (req, res)=>{
  List.findByIdAndUpdate(req.params.id, req.body, (error, updatedList)=>{
    res.redirect('/index')
  })
})



router.get('/seed', (req, res)=>{
  List.create(
    [
      {
        task: 'visit my friend',
        time: '13 AM'
      },
      {
        task: 'Go Sleep',
        time: '10 PM'
      },
      {
        task: 'eat',
        time: '12 PM'
      }
    ],
    (error, data)=>{
      if(error){
        console.log(error);
      } else{
          res.redirect('/index')
      }

    }
  )
})


router.get('/:id', (req, res)=>{
  List.findById(req.params.id, (error, foundList)=>{
    res.render('show.ejs',
      {
        lists:foundList
      })
  })
})


router.delete('/:id', (req, res)=>{
  List.findByIdAndRemove(req.params.id, (error, data)=>{
    res.redirect('/index')
  })
})

router.get('/:id/edit', (req, res)=>{
  List.findById(req.params.id, (error, foundList)=>{
    res.render(
      'edit.ejs',
      {
        list:foundList
      })
  })
})

module.exports = router
