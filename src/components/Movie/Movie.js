import React from 'react'
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation'
import MovieInfo from '../elements/MovieInfo/MovieInfo'
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar'
import Actor from '../elements/Actor/Actor';
import FourColGrid from '../elements/FourColGrid//FourColGrid'
import Spinner from '../elements/Spinner/Spinner'
import './Movie.css'

class Movie extends React.Component {
    
    //    state = {
    //        movie : null , 
    //        actor : null , 
    //        directors : [] , 
    //        loading : false
    //    }

    //      componentDidMount(){
    //         this.setState({loading : true})   
    //         let endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`
    //         this.fetchItem(endpoint)
    
    //     }

    
    //    fetchItem = (endpoint) => {
    //        fetch(endpoint)
    //         .then(result => result.json)
    //         .then( result => {

    //             if(result.status_id)
    //             {
    //                 this.setState({loading : false})
    //             }
    //             else
    //             {
    //                 this.setState({movie : result } , () => {
    //                     const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}&language=en-US`
    //                     fetch(endpoint)
    //                     .then(result => result.json)
    //                     .then (result => {

    //                         const director = result.crew.filter( (member) =>  member.job === "Director")

    //                         this.setState({
    //                             actor : result.cast ,
    //                             director , 
    //                             loading : false
    //                         })

    //                     })
    //                 })
    //             }

    //         })
    //     }


    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false
      }
    
      componentDidMount() {
        if(localStorage.getItem(`${this.props.match.params.movieId}`))
        {
          const movieState = JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`) )
          this.setState({ ...movieState})
        }
        else{
        this.setState({ loading: true })
        // First fetch the movie ...
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
      }
      }
      fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
         console.log(result)
          if (result.status_code) {
            this.setState({ loading: false });
          } else {
            this.setState({ movie: result }, () => {
              // ... then fetch actors in the setState callback function
              const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
              fetch(endpoint)
                .then(result => result.json())
              .then(result => {
                const directors = result.crew.filter( (member) => member.job === "Director");
    
                this.setState({
                  actors: result.cast,
                  directors,
                  loading: false
                }, () => { 
                  localStorage.setItem(`${this.props.match.params.movieId}`, JSON.stringify(this.state))
                })
                console.log(this.state.actors)
              })
            })
          
          }
        })
        .catch(error => console.error('Error:', error))
       
      }
        render(){
        return(
            <div className= "rmdb-Movie">
               {this.state.movie ? 
                <div>
                   <Navigation movie = {this.state.movie} />
                   <MovieInfo movie = {this.state.movie} directors = {this.state.directors} />
                <MovieInfoBar info = {this.state.movie} />
          
                 </div> 
          : null  
        }
          {this.state.actors ?
            <div className="rmdb-image-grid">
              <FourColGrid header="Actor">
                {this.state.actors.map( (element,i) => {
                  return <Actor key={i} actor = {element} />
                })}

              </FourColGrid>
            </div>
          : null }        

            {!this.state.movie && !this.state.loading ? <h1>No Movie Found</h1> : null}
            {this.state.loading ? <Spinner /> : null}

            </div>

        )
    }
}

export default Movie;