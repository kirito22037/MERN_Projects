import axios from 'axios';
import Cookies from 'js-cookie';

let initState = {
    authentication : {
        auth : false,
        name : "beta",
        email : "beta@gmail.com",
        token : ""
    },
    tasks : []
};

const rootReducer = (state = initState, action)=>{
    console.log(action.type);
    if(action.type==="update the auth stat")
    {
        console.log("the reducer is called of type : ",action.type);
        console.log(action.data);

        Cookies.set('token' , action.data.token);
        
        return ({
            ...state,
            authentication : {
                auth : action.data.auth,
                name : action.data.name,
                email : action.data.email,
                token : action.data.token
            }
        });
    }

    else if(action.type==="new task")
    {
        //make a api req 
        //then update the store by returning the store
        return {
            ...state ,
            tasks : [...state.tasks , action.data]
        }
    }

    else if(action.type === "load tasks")
    {
        return {
            ...state,
            tasks : action.data
        }
    }

    else if(action.type === "delete task")
    {
        //make request to delete
        axios.post('http://localhost:5000/todo/deleteTask' , {
            taskId : action.data,
            token : state.authentication.token
        })
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err)
        });

        //updating store locally
        let updatedTasks = state.tasks.filter(task => action.data!==task._id );

        return { 
            ...state,
            tasks : updatedTasks
        };
    }

    else if(action.type === "update task status")
    {
        //make a req to update status in db
        axios.post('http://localhost:5000/todo/statUpdate',{
            taskId : action.data,
            token : state.authentication.token
        })
        .then(res=>{
            console.log("status updated : ",res.data);
        })
        .catch(err=>{
            console.log("error occured : ",err);
        });

        //change store data 
        return({
            ...state,
            tasks : state.tasks.map(task=>{
                if(task._id === action.data){
                    console.log("match found");
                    return ({
                        ...task,
                        status : !task.status
                    })
                }

                return task;
            })
        });
    }

    return state;
};

export default rootReducer;