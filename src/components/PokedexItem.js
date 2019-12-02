import React from 'react';
import axios from 'axios';
import '../style/PokedexItem.css';

const colorTypes = {
    poison: '#A558EB',
    grass: '#23B436',
    fire: '#FC4335',
    electric: '#FEF749',
    water: '#4F7AE9',
    flying: '#C4D4FE',
    bug: '#7C5E40'
}

export default class PokedexItem extends React.Component{
    state = {
        types: [],
        images: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.index + 1}.png`
    }
    componentDidMount = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.index + 1}`,  {
            headers: {
                'Access-Control-Allow-Origin': 'pokeapi.co',
                'Content-Type': 'application/json'
            }     
        })
            .then( (response) => {
                console.log(response.data.types)
                this.setState({
                    types: response.data.types
                })
            })
            .catch( (error) => {
              console.log(error);
            })
    }
    createItem = (item, index) => {
        var style = {backgroundColor: '#ffffff'}
        for( let type in colorTypes){
            if(item.type.name === type){
                return <span style={{backgroundColor: colorTypes[type]}}
                    className='types-item' 
                    key={index}>
                        {item.type.name}
                    </span>
            } 
        }
        return <span style={style}
            className='types-item' 
            key={index}>
                {item.type.name}
            </span>  
    }
    render(){
        const {props, state} = this
        return(
            <div className='item-wrapper' onClick={ () => this.props.getMoreInformation(props.index)}>
                <img className='item-image' src={state.images}/>
                <span className='item-name'>{props.item.name}</span>
                <div className="types-wrapper">
                    {this.state.types.map((item, index) => this.createItem(item, index))}
                </div>
            </div>
        )
    }
}