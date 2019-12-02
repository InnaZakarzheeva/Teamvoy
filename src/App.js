import React from 'react';
import './App.css';
import PokedexList from './components/PokedexList';

export default class App extends React.Component{
  render(){
    return(
      <div className='App-wrapper'>
        <PokedexList/>
      </div>
    )
  }
}
