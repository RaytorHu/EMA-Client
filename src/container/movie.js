import React, { Component } from "react";
import MovieList from "./data/moviesDB.json";
import { List, Avatar, Icon} from "antd";
import config from "../config.js"

const axios = require('axios');

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
        </span>
);

class Movie extends Component {
    constructor(props){
        super(props);
        this.state={
            Mdata: []
        };
    }

    addfavorite(key){
        // function findMovieID(id){
        //     return Mdata.MovieID === id;
        // }
        //
        // axios({
        //     method: 'POST',
        //     url: config.base_url + 'api/v1/MovieManagement',
        //     data: {
        //         id: key,
        //         userID: 'johndoe@sfu.ca'
        //     },
        //     headers:{
        //         'Authorization': 'Bearer' + this.state.token
        //     }
        // })
        //     .then((response) =>{
        //         const index = Mdata.findIndex(findMovieID(key));
        //         this.setState({
        //             Mdata: Mdata[index].favorite = !(Mdata[index].favorite)
        //         })
        //     })
    }

    extractList(){
        const tmp = [];

        for(let i=0; i < MovieList.movies.length; i++){

            tmp.push({
                MovieID: MovieList.movies[i].id,
                title: MovieList.movies[i].name,
                release: MovieList.movies[i].releaseDate,
                genres: MovieList.movies[i].genres,
                synopsis: MovieList.movies[i].synopsis,
                avatar: MovieList.movies[i].posterLargeURL,
                trailer: MovieList.movies[i].trailerURL,
                Movie_len: MovieList.movies[i].runtime,
                rate: MovieList.movies[i].rating,
                href: MovieList.movies[i].webURL,
                favorite: false
            });
        }

        return tmp;
    };

    componentDidMount(){
        var moviedata =  this.extractList();
        this.setState({
            Mdata: moviedata
        });
        console.log(this.state.Mdata);
    };

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={this.state.Mdata}
                renderItem={item => (
                    <List.Item
                        key={item.MovieID}
                        actions={[
                            <IconText type="clock-circle" text={item.release} />,
                            <IconText type="hourglass" text={item.Movie_len} />,
                            <p>rating: {item.rate}</p>,
                            <p>trailer: <a href={item.trailer} target="_blank"><Icon type="play-circle"/></a></p>,
                            <p><IconText type="heart"/><button onClick={this.addfavorite(item.MovieID)}>Add to Wishlist</button></p>
                        ]}
                        extra={<img width={272} alt="logo" src={item.avatar} />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href} target="_blank">{item.title}</a>}
                            description={item.genres}
                        />
                        {item.synopsis}
                    </List.Item>
                )}
            />
        );
    }
}

export default Movie;