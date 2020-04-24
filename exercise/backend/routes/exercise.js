const router = require('express').Router();
const Exercise = require('../models/exercise');   //model


//to get list of all exercise
router.get('/' , (req,res)=>{
    Exercise.find()
     .then(exercise => res.json(exercise))
     .catch(err=> res.status(400).json('Error : '+err));
});


//to add a new exercise
router.post('/add' , (req, res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    newExercise.save()
     .then(()=>res.json('Exercise added!'))
     .catch(err=>res.status(400).json('Error : '+err));
});


//to find a exercise by id for update
router.get('/:id' , (req, res)=>{
    Exercise.findById(req.params.id)
     .then(exercise=>res.json(exercise))
     .catch(err=>res.json('Error : '+err));
});


//find and delete
router.delete('/delete/:id' , (req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
     .then(()=>res.json('Exercise deleted'))
     .catch((err)=>res.json('Error : '+err));
});

//find and update
router.put('/update/:id' , (req, res)=>{
    Exercise.findById(req.params.id)
     .then(exercise => {
         exercise.username = req.body.username,
         exercise.description = req.body.description,
         exercise.duration = Number(req.body.duration),
         exercise.date = Date(req.body.date);

         exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
     })
     .catch(err=>res.status(400).json('Error : '+err));
});

module.exports = router;