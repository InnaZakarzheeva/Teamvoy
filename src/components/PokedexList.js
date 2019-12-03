import React from 'react';
import axios from 'axios';
import '../style/PokedexList.css';
import PokedexItem from './PokedexItem';
import PokedexMoreInfo from './PokedexMoreInfo';

export default class PokedexList extends React.Component{
    state = {
        firstUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=12/',
        nextUrl: "",
        pokemons: [],
        showMoreInfo: false,
        information: {},
        stats: {
            stats: [],
            types: [],
            weight: 0,
            total_moves: 0
        }
    }
    componentDidMount = () => {
       this.getInformation(this.state.firstUrl)
    }
    getInformation = (url) => {
        axios.get(url,  {
            headers: {
                'Access-Control-Allow-Origin': 'pokeapi.co',
                'Content-Type': 'application/json'
                
            }     
        })
            .then( (response) => {
                this.setState({
                    nextUrl: response.data.next,
                    pokemons: this.state.pokemons.concat(response.data.results)
                })
            })
            .catch( (error) => {
              console.log(error);
            })
    }
    getMoreInformation = (id) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id+1}`,  {
            headers: {
                'Access-Control-Allow-Origin': 'pokeapi.co',
                'Content-Type': 'application/json'
            }     
        })
            .then( (response) => {
                this.setState({
                    showMoreInfo: true,
                    stats: {
                        name: response.data.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`,
                        id: id,
                        stats: response.data.stats,
                        types: response.data.types,
                        weight: response.data.weight,
                        total_moves: response.data.moves
                    }
                })
            })
            .catch( (error) => {
              console.log(error);
            })
       this.showMoreInformation()
    }
    closeShowInfo = () => {
        this.setState({
            showMoreInfo: false
        })
    }
    showMoreInformation = () => {
        return <PokedexMoreInfo stats={this.state.stats} closeShowInfo={this.closeShowInfo}/>
    }
    render(){
        return(
            <div className='pokedex-wrapper'>
                <h1 className='title'>Pokedex</h1>                    
                <div className='main-wrapper'>
                    <div className='list-wrapper'>
                        {this.state.pokemons.map( (item, index) => {
                            return <PokedexItem key={index} 
                                item={item} 
                                index={index} 
                                getMoreInformation={this.getMoreInformation}
                                filterColor={this.state.filterColor}/>
                        })}
                        <button className='load-button' onClick={() => this.getInformation(this.state.nextUrl)}>Load More</button>
                    </div>
                    <div className='detail-item-wrapper' style={{display: this.state.showMoreInfo ? 'flex' : 'none'}}>
                        {this.showMoreInformation()}
                    </div>
                </div>
            </div>
        )
    }
}