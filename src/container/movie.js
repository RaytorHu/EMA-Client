import React, { Component } from "react";
import MovieList from "./data/moviesDB1.json";
import { List, Avatar, Icon} from "antd";
import config from "../config.js"
//import storage from "../utils/Storage"

const axios = require('axios');
var addToWishlist = 'Add to wishlist';
var removeFromWishlist = 'Remove from wishlist';

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

    extractList(){
        const tmp = [];
        for(let i=0; i < MovieList.movies.length; i++){
            tmp.push({
                id: MovieList.movies[i].id,
                title: MovieList.movies[i].name,
                release: MovieList.movies[i].releaseDate,
                avatar: MovieList.movies[i].posterLargeURL,
                Movie_len: MovieList.movies[i].runtime,
                genres: MovieList.movies[i].genres,
                synopsis: MovieList.movies[i].synopsis,
                href: MovieList.movies[i].webURL,
                inWishlist: false,
                btnText: addToWishlist
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

    //TODO: test the function when DB is delpoyed and change the value of the button according to the boolean favorite
    handleClick(key){
        console.log(key);
        function findMovieID(records){
            return records.id === key;
        }
        const index = this.state.Mdata.findIndex(findMovieID);
        this.changeWishlist(index);
        console.log(this.state.Mdata[index].inWishlist);
        this.changebtnText(index);
        console.log(this.state.Mdata[index].btnText);
        this.forceUpdate();

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
        //
        //     })
    }

    changeWishlist(index){
        this.state.Mdata[index].inWishlist = !(this.state.Mdata[index].inWishlist);
    }

    changebtnText(index){
        if(!this.state.Mdata[index].inWishlist){
            this.state.Mdata[index].btnText = addToWishlist;
        }
        else{
            this.state.Mdata[index].btnText = removeFromWishlist;
        }

    }

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
                        key={item.id}
                        actions={[
                            <IconText type="clock-circle" text={item.release} />,
                            <IconText type="hourglass" text={item.Movie_len} />,
                            <p>rating: {item.rate}</p>,
                            <p>trailer: <a href={item.trailer} target="_blank"><Icon type="play-circle"/></a></p>,
                            <p><IconText type="heart"/><button onClick={() => this.handleClick(item.id)}>{item.btnText}</button></p>
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