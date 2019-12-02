import React from 'react';
import imgClose from '../image/iconClose.png'
import '../style/PokedexMoreInfo.css'
import '../style/PokedexList.css'

export default class PokedexMoreInfo extends React.Component{
    createTable = () => {
        return <tbody> 
                <tr className="tr">
                    <td className="td">Type</td>
                    <td className="td">{this.props.stats.types.map( i => {
                        return `${i.type.name} `
                    })}</td>
                </tr>
                {this.props.stats.stats.sort( (a,b) => 
                    a.stat.name > b.stat.name ? 1 : -1
                ).map( (item, index) => {
                    return <tr key={index} className="tr">
                                <td className="td">{item.stat.name}</td>
                                <td className="td">{item.base_stat}</td>
                            </tr>
                })}
                <tr className="tr">
                    <td className="td">Weight</td>
                    <td className="td">{this.props.stats.weight}</td>
                </tr>
                <tr className="tr">
                    <td className="td">Total moves</td>
                    <td className="td">{this.props.stats.total_moves.length}</td>
                </tr>
            </tbody>
    }
    render() {
        const {image, name, id} = this.props.stats
        return(
            <div className='more-info-wrapper'>
                <img src={imgClose} alt='close' className='iconClose' onClick={() => this.props.closeShowInfo()}/>
                <img src={image} className='more-info-image' alt='pokemon'/>
                <span className='more-info-title'>{name} {id+1<10 ? `#00${id+1}` : `#0${id+1}`}</span>
                <table className='table-wrapper'>
                    {this.createTable()}
                </table>
            </div>
        )
    }
}