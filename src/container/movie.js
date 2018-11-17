import React, { Component } from "react";
import MovieList from "./data/moviesDB1.json";
import { List, Avatar, Icon, Button} from "antd";
import config from "../config.js";
import axios from "axios";
import storage from "../utils/Storage"

const addToWishlist = 'Add to wishlist';
const removeFromWishlist = 'Remove from wishlist';

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
    };

    //TODO: test the function when DB is delpoyed and change the value of the button according to the boolean favorite
    handleClick(key){
        function findMovieID(records){
            return records.id === key;
        }
        const index = this.state.Mdata.findIndex(findMovieID);
        this.changeWishlist(index);
        this.changebtnText(index);
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

    addTransaction(title){
        const regex = /[0-9]+/;
        const query = "Please enter the price of the movie ticket";
        const price = prompt(query);
        console.log(price);
        if(regex.test(price)){
            axios({
                method: 'post',
                url: config.base_url+'api/v1/transaction',
                data: {
                    amount: parseFloat(price),
                    description: "purchase movie ticket of " + title
                },
                headers: {
                    'Authorization': 'Bearer ' + storage.getAuthToken()
                }
            })
            .then( (response) => {
                alert("Transaction Added");
            })
            .catch( (err) => {
                console.log(err);
                alert("Unexpected error occured. Please try again later");
            });
        }
        else if(price != null){
            alert("Input must be numerics. Please try again.");
        }
    }

    changeWishlist(index){
        let movieList = this.state.Mdata;
        movieList[index].inWishlist = !(this.state.Mdata[index].inWishlist);
        this.setState({
            Mdata: movieList
        });
    }

    changebtnText(index){
        let movieList = this.state.Mdata;
        if(!movieList[index].inWishlist){
            movieList[index].btnText = addToWishlist;
        }
        else{
            movieList[index].btnText = removeFromWishlist;
        }

        this.setState({
            Mdata: movieList
        });
    }

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 5,
                }}
                dataSource={this.state.Mdata}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <IconText type="clock-circle" text={item.release} />,
                            <IconText type="hourglass" text={item.Movie_len} />,
                            <p>trailer: <a href={item.trailer} target="_blank"><Icon type="play-circle"/></a></p>,
                            <p><IconText type="heart"/><Button onClick={() => this.handleClick(item.id)}>{item.btnText}</Button></p>,
                            <p><IconText type="pay-circle"/><Button onClick={() => this.addTransaction(item.title)}>Add transaction</Button></p>
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