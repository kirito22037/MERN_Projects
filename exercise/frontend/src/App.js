import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter , Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ExerciseList from './components/exerciselist';
import EditExercise from './components/editexercise';
import CreateExercise from './components/createexercise';
import CreateUser from './components/createuser';


function App() {
  //
  return (
    <BrowserRouter>
    <div className="container">
      <Navbar/>
      <br/>
      <Route path='/' exact component={ ExerciseList }/>
      <Route path="/edit/:id" component={ EditExercise }/>
      <Route path="/create" component={ CreateExercise }/>
      <Route path="/user" component={ CreateUser }/>
    </div>
    </BrowserRouter>
  );
}

export default App;
