const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express'); 
const bodyParser = require('body-parser');

const router = express.Router();

//db models
const Task = require('../model/task');
const Users = require('../model/user');


router.use(bodyParser.urlencoded({ extended : true}) );
router.use(bodyParser.json());

router.post('/newtask',(req,res)=>{
    const userToken = req.body.token;
    if (!userToken) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(userToken , 'raisecretkey' , (err, decoded)=>{
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        const userId = decoded.id;
        const newTask = new Task({
            taskData : req.body.taskData,
            status : false,
            userId : userId
        });
        newTask.save()
        .then(doc=>{
            Users.findById(userId)
                .then(user=>{
                    user.tasks = [...user.tasks , newTask._id];
                    user.save(()=>{console.log("new id is added to user tasks");});
                })
                .catch(err=>res.status(500).send("error while adding tasks"));

            res.status(202).send({
                message : "new task added",
                data : {
                    _id : doc._id,
                    taskData : doc.taskData,
                    status : doc.status
                }
            });
        })
        .catch(err=>{
            res.status(500).send("an error occured while adding task");
        });
    });
});

//idT should be without ""
router.get('/tasks' , (req,res)=>{
    const idToken = req.query.token;
    console.log("the token : ",idToken);

    jwt.verify(idToken , 'raisecretkey' ,(err , decoded)=>{
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Users.findById(decoded.id).populate("tasks")
        .then(result=>{
            res.status(203).send(result);
        })
        .catch(err=>{
            res.status(500).send("error occured while retriving data");
        })
    });
});

//remove a task from both user collection and task collection
router.post('/deleteTask' ,(req,res)=>{
    const idToken = req.body.token;
    console.log("the token : ",idToken);

    jwt.verify(idToken , 'raisecretkey' ,(err , decoded)=>{
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Users.findById(decoded.id)
        .then(user=>{
            //remove th id from user tasks
            user.tasks = user.tasks.filter(id => id != req.body.taskId);
            user.save()
                .then(doc=>{console.log("updated user tasks field ,deleted id : ",doc.tasks)})
                .catch(err=>{res.status(500).send("error while updating tasks in user model")});

            //now delete from the tasks collection
            Task.findByIdAndDelete(req.body.taskId)
                .then(doc=>{
                    res.status(200).send({
                        message : "task deleted",
                        data : doc
                    });
                })
                .catch(err=>{
                    res.status(500).send("error while deleting task from Task model");
                });

        })
        .catch(err=>{
            res.status(500).send("user notfound");
        });
    });
});


router.post('/statUpdate' , (req,res)=>{
    //const taskId = req.body.taskId;
    Task.findById(req.body.taskId)
    .then(doc=>{
        doc.status = !doc.status;
        doc.save()
        .then(doc=>{
            res.status(200).send({
                message : "the status is updated",
                data : doc
            });
        })
        .catch(err=>{
                res.status(500).send(err);
        });
    })
    .catch(err=>{
        res.status(500).send(err);
    });
});

module.exports = router;
