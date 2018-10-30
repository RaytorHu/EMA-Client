import React, { Component } from "react";
import MovieList from "./data/moviesDB.json";
import { List, Avatar, Icon} from "antd";


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
            data: []
        };
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
                href: MovieList.movies[i].webURL
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
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item
                        key={item.MovieID}
                        actions={[
                            <IconText type="clock-circle" text={item.release} />,
                            <IconText type="hourglass" text={item.Movie_len} />,
                            <p>rating: {item.rate}</p>,
                            <p>trailer: <a href={item.trailer} target="_blank"><Icon type="play-circle"/></a></p>,
                            <a href=""><IconText type="heart" text="Add to Wishlist" /></a>
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