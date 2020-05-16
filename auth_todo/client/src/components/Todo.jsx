import React,{ useEffect } from 'react';
import Collection from './collection';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { newTaskAsyncAction } from '../asyncActions/actions';


const checkAuth = (props)=>{
        
    if(!props.authentication.auth)
    {
        console.log("not login");
        //redirect to login page
        props.history.push("/login"); 
    }
    else
    {
        console.log("fetching task data");
        axios.get('http://localhost:5000/todo/tasks', {
        params: {
        token: props.authentication.token } //idT is token of the user
        })
        .then(res=>{
            console.log("data loaded successfully");
            console.log(res);

            //load fresh data from db
            props.loadTasks(res.data.tasks);
            })
        .catch(err=>{
            console.log(err);
        });
    }
};

  //--------------how can i pass props with this event target
  const handleEnter =(props, e)=>{
    if(e.key === 'Enter')
    {
        let taskData = e.target.value;
        console.log("the value recieved : ",taskData);
        const token = props.authentication.token;
        
        props.newTask({ taskData , token });
        e.target.value = "";
    }
};

//------------function component--------------
const Todo =(props)=>{

    //componentDidMount
    useEffect(()=>{
        checkAuth(props);
    },[]);


    return(
        <div className="container ">

            <div className="input-field">
            <i className="material-icons prefix">mode_edit</i>
            <input
            type="text" 
            id="inputToDo" 
            className="autocomplete"
            onKeyDown={ (e)=>handleEnter(props,e) }></input>
            <label htmlFor="inputToDo">Enter your Task</label>
            </div>

            <Collection/>
        </div>
    );
};

const mapStateToProps = (state , ownProp)=>{
    return({
        authentication : state.authentication
    });
};

const mapDispatchToProps = (dispatch)=>{
    return({
        newTask : (data)=>{
            dispatch(newTaskAsyncAction(data));
        },
        loadTasks : (tasks)=>{
            dispatch({ type : "load tasks" , data : tasks});
        }
    });
};

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Todo)); 