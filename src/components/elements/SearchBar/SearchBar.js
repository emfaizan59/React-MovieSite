import React, { Component } from 'react';
import './SearchBar.css';

class Searchbar extends Component {

    state = {
        searchValue : ''
    }

    timeout = null;
    doChange = (event) => {
        this.setState({ searchValue : event.target.value  })
  
        clearTimeout(this.timeout)
    
       this.timeout = setTimeout(() => {
           this.props.callback(this.state.searchValue)
       }, 500);

       } 

    render(){
        return(
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    
                    <input
                    type ="text"
                    placeholder = "Search"
                    className="rmdb-searchbar-input"
                    value = {this.state.searchValue}
                    onChange = {this.doChange}
         />
                </div>
            </div>
        )
    }
}

export default Searchbar;