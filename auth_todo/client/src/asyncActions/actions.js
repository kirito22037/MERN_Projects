import axios from 'axios';

export const newTaskAsyncAction = (data)=>{
    return ((dispatch , setState)=>{

        axios.post('http://localhost:5000/todo/newtask',{
            token : data.token,
            taskData : data.taskData
        })
        .then(res=>{
            console.log("async action result : ");
            console.log(res);
            
            //disatch only after the result is recieved
            dispatch({ type : "new task" , data : res.data.data});
        })
        .catch(err=>{
            console.log("error : ",err);
        });
    });
};