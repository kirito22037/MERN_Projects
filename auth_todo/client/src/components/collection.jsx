import React from 'react';
import { connect } from 'react-redux';

const hoverEffect1 =(e)=>{
    e.target.classList.add('lighten-4');
    e.target.classList.remove('lighten-5');
};

const hoverEffect2 =(e)=>{
    e.target.classList.add('lighten-5');
    e.target.classList.remove('lighten-4');
};

const completedstyle={
    fontStyle : "italic",
    color : "grey",
    textDecoration : "line-through"
};

//-------------parent-------------
const Collection =(props)=>{
   
                if(props.tasks.length === 0)
                {
                    return (<h3 className="center">No Tasks Yet</h3>);
                }
        
                else
                {   return (
                        <ul className="collection">
                            {
                                props.tasks.map(task=>(
                                    <li 
                                    key = { task._id }
                                    className="collection-item blue-grey lighten-5"
                                    onMouseEnter={ hoverEffect1 } 
                                    onMouseLeave={ hoverEffect2 }
                                    onClick={ ()=>{ props.updateTaskStatus(task._id) }}
                                    style={ task.status ? completedstyle : null } >
                                
                                    <div>{ task.taskData }
                                
                                    <span  
                                    className="secondary-content icon"
                                    onClick={ () =>{props.deleteTask(task._id)} }>
                                    <i className="material-icons">delete</i>
                                    </span>
                                    
                                    </div>
                                    </li>
                            ))}</ul>);
                }
            };

const mapStateToProps = (state, ownProp)=>{
    return ({
        tasks : state.tasks
    });
};

const mapDispatchToProps = (dispatch)=>{
    return({
        deleteTask : (taskId)=>{
            dispatch({type : "delete task" , data : taskId });
        },
        updateTaskStatus : (taskId)=>{
            dispatch({type : "update task status" , data : taskId });
        }
    })
};

export default connect( mapStateToProps , mapDispatchToProps)(Collection);