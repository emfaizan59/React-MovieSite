import React, {Component} from 'react';
import { API_URL , API_KEY , IMAGE_BASE_URL , BACKDROP_SIZE , POSTER_SIZE } from '../../config';
import './Home.css';

import HeroImage from '../elements/HeroImage/HeroImage';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import SearchBar from '../elements/SearchBar/SearchBar';
import Spinner from '../elements/Spinner/Spinner';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
var count = 0 ;

class Home extends Component{
    state = {
        movies: [],
        HeroImage : null, 
        loading : false, 
        searchTerm : '',
        currentPage : 0,
        totalPage : 0 
        
    } 

    componentDidMount(){

        if(localStorage.getItem('HomeState')){

            const state = JSON.parse(localStorage.getItem('HomeState'));
            this.setState({ ...state})

        }
        else{
        this.setState({loading : true})
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint)
    }
    }
    searchItems = (searchTerm) =>{
        console.log(searchTerm)
        let endpoint = ''
        this.setState({
            movies : [], 
            loading : true,
            searchTerm : searchTerm
        })

        if(searchTerm === '')
        {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        }
        else{
            endpoint =  `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    
        }
        this.fetchItems(endpoint)
    }

    LoadMoreBtn = () => {
       let endpoint = ''
        this.setState({loading:true})
        if(this.state.searchTerm === ''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        }
        else{
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query${this.state.searchTerm}&page=${this.state.currentPage+1}`
        }
        this.fetchItems(endpoint)
    }
     
     
     
    fetchItems = (endpoint) =>{
     
    
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {   
         
         count += result.results.length
         console.log(count)
         var  ran = Math.floor((Math.random() * count) + 0);
         this.setState({
            // movies : [...this.state.movies , ...result.results],
            // HeroImage : this.state.HeroImage || result.results[0],
            // loading : false , 
            // currentPage : result.page , 
            // totalPage : result.total_pages
            
            movies: [...this.state.movies, ...result.results],
            HeroImage: this.state.HeroImage || result.results[ran],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages 
        }, () => {
            if(this.state.searchTerm === "")
            {
                localStorage.setItem('HomeState', JSON.stringify(this.state));
            }
        })
            
        })
    }
    render(){
        return(
            <div className="rmdb-Home">
            {this.state.HeroImage ? 
            <div>
            <HeroImage 
                image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.HeroImage.backdrop_path}`}
                title = {this.state.HeroImage.original_title}
                text = {this.state.HeroImage.overview}
                clickable = {true}
                movieId = {this.state.HeroImage.id}
                
            />
            <SearchBar callback={this.searchItems} />
            </div> : null }
            <div className="rmdb-home-grid">
            <FourColGrid
              header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
              loading={this.state.loading}
            >
              {this.state.movies.map( (element, i) => (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                  movieId={element.id}
                  movieName={element.original_title}
                />
              ))}
            </FourColGrid>
            {this.state.loading ? <Spinner /> : null}
            {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
              <LoadMoreBtn text="Load More" onClick={this.LoadMoreBtn} />
              : null
            }
            </div>           
            </div>
        )
    }
}

export default Home; 