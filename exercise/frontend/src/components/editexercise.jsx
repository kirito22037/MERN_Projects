//see the dropdoown and Datepicker column in form
//check if put is available in axios


import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditExercise extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            username : '',
            description : '',
            duration : '',
            date : new Date(),
            users : []
        }
    }

    onChangeUsername = (e)=>{
        this.setState({
            username : e.target.value
        });
    };

    onChangeDescription = (e)=>{
        this.setState({
            description : e.target.value
        });
    };

    onChangeDuration = (e)=>{
        this.setState({
            duration : e.target.value
        });
    };

    onChangeDate = (date)=>{
        this.setState({
            date : date
        });
    };

    handleSubmit = (e)=>{
        e.preventDefault();

        const exercise = {
            username : this.state.username ,
            description : this.state.description , 
            duration : this.state.duration , 
            date : this.state.date
        }

        console.log("the final updated version : ",exercise);


        //check ig put is available
        axios.put('http://localhost:5000/exercise/update/'+this.props.match.params.id , exercise)
         .then(res=>console.log(res.data));

         //redirect to homepage
         window.location = '/';
    };

    componentDidMount()
    {
        axios.get('http://localhost:5000/exercise/'+this.props.match.params.id)
         .then(res=>{
             this.setState({
                 username : res.data.username,
                 description : res.data.description,
                 duration : res.data.duration,
                 date : new Date(res.data.date)
             });
         })
         .catch((err)=>{
             console.log("Error : "+err);
         });
        

         //get list of all users
         axios.get('http://localhost:5000/users/')
          .then(response=>{
              if(response.data.length > 0)
              {
                  this.setState({
                      users : response.data.map(user=>user.username),
                  })
              }
          })
          .catch((err)=>{
              console.log("Error : "+err);
          });
    }

    render()
    {
        return(
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={ this.handleSubmit }>
                    
                    <div className="form-group">
                        <label>Username : </label>
                        <select 
                        ref="userInput"
                        required
                        className="form-control"
                        value={ this.state.username }
                        onChange={ this.onChangeUsername }>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                        key={user}
                                        value={user}>
                                            {user}
                                        </option>
                                })
                            }
                        </select>
                    </div>

                    <div className = "form-group">
                        <label>Description : </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minute): </label>
                        <input
                        type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                             selected={this.state.date}
                             onChange={this.onChangeDate}
                             />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit"
                        value="Edit Exercise Log"
                        className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
};

export default EditExercise;