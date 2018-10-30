import React, { Component } from "react";
import MovieList from "./data/moviesDB.json";
import { List, Avatar, Icon, Rate } from "antd";

class Movie extends Component {
    constructor(props){
        super(props);
        this.state={
            data: []
        };
    }

    extractList(){
        const tmp = [];

        for(let i=0; i < MovieList.movies.length; i++){
            tmp.push({
                MovieID: MovieList.movies[i].id,
                Moviename: MovieList.movies[i].name,
                release: MovieList.movies[i].releaseDate,
                genres: MovieList.movies[i].genres,
                synopsis: MovieList.movies[i].synopsis,
                pic: MovieList.movies[i].posterLargeURL,
                trailer: MovieList.movies[i].trailerURL,
                Movie_len: MovieList.movies[i].runtime,
                rate: MovieList.movies[i].rating,
                weblink: MovieList.movies[i].webURL
            });
        }

        return tmp;
    };

    componentDidMount(){
        var moviedata =  this.extractList();
        this.setState({
            data: moviedata
        });
        console.log(this.state.data);
    };

    render() {
        //console.log(MovieList.movies.length);
        return (
            <List dataSource={this.state.data} renderItem={}
            />
        )
    }
}

export default Movie;