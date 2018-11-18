import React, { Component } from "react";
import listData from "../container/data/moviesDB1.json";
import { List, Avatar, Icon, Button } from "antd";
import config from "../config.js";
import axios from "axios";
import storage from "../utils/Storage";
import MovieReview from "./movieReview";
import ReviewModal from "./movieReviewModal";

const addToWishlist = 'Add to wishlist';
const removeFromWishlist = 'Remove from wishlist';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
        </span>
);

class MovieList extends Component {
    constructor(props){
        super(props);
        this.state={
            Mdata: [],
            reviews: [],
            modal_visible: false,
            review_title: '',
            review_content: ''
        };
    }

    extractList(){
        const tmp = [];
        for(let i=0; i < listData.movies.length; i++){
            tmp.push({
                id: listData.movies[i].id,
                title: listData.movies[i].name,
                release: listData.movies[i].releaseDate.substring(0,10),
                avatar: listData.movies[i].posterLargeURL,
                Movie_len: listData.movies[i].runtime,
                genres: listData.movies[i].genres,
                synopsis: listData.movies[i].synopsis,
                href: listData.movies[i].webURL,
                inWishlist: false,
                btnText: addToWishlist
            });
        }
        return tmp;
    };

    componentDidMount(){
        let moviedata =  this.extractList();
        this.setState({
            Mdata: moviedata
        });
    };

    //TODO: test the function when DB is delpoyed and change the value of the button according to the boolean favorite
    handleClick(key, imageURL){
        function findMovieID(records){
            return records.id === key;
        }
        const index = this.state.Mdata.findIndex(findMovieID);
        this.changeWishlist(index);
        this.changebtnText(index);
        this.forceUpdate();

        // axios({
        //     method: 'POST',
        //     url: config.base_url + 'api/v1/MovieManagement',
        //     data: {
        //         id: key,
        //         userID: storage.getUserInfo().id,
        //         imgURL: imageURL
        //     },
        //     headers:{
        //         'Authorization': 'Bearer ' + storage.getAuthToken()
        //     }
        // })
        //     .then((response) =>{
        //         alert("add to profile successfully");
        //     })
    }

    showmodal(){
        this.setState({
            modal_visible: true
        });

        this.forceUpdate();
    }

    handleOk(){
        if(this.state.review_title && this.state.review_content){
            const record = [this.state.review_title, this.state.review_content];
            const rec = this.state.reviews;
            rec.push(record);
            this.setState({
                reviews: rec,
                modal_visible: false,
                review_title: '',
                review_content: ''
            });
            console.log(this.state.reviews);
            this.forceUpdate();
        }
        else{
            alert("Please input the review title and content.");
        }
    }

    handleCancel(){
        this.setState({
            modal_visible: false
        });
        this.forceUpdate();
    }

    onTitleChange(event){
        this.setState({
            review_title: event.target.value
        });
        this.forceUpdate();
    }

    onContentChange(event){
        this.setState({
            review_content: event.target.value
        });
        this.forceUpdate();
    }

    addTransaction(title){
        const regex = /[0-9]+/;
        const query = "Please enter the price of the movie ticket";
        const price = prompt(query);
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
        let listData = this.state.Mdata;
        listData[index].inWishlist = !(listData[index].inWishlist);
        this.setState({
            Mdata: listData
        });
    }

    changebtnText(index){
        let listData = this.state.Mdata;
        if(!listData[index].inWishlist){
            listData[index].btnText = addToWishlist;
        }
        else{
            listData[index].btnText = removeFromWishlist;
        }

        this.setState({
            Mdata: listData
        });
    }

    render() {
        return (
            <div>
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
                            <p><IconText type="heart"/><Button onClick={() => this.handleClick(item.id, item.avatar)}>{item.btnText}</Button></p>,
                            <p><IconText type="pay-circle"/><Button onClick={() => this.addTransaction(item.title)}>Add transaction</Button></p>,
                            <p><IconText type="message"/><Button onClick={this.showmodal.bind(this)}>Write a review</Button></p>
                            //<MovieReview reviews=this.state.reviews/>
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
            <ReviewModal
                visible={this.state.modal_visible}
                handleOk={this.handleOk.bind(this)} 
                handleCancel={this.handleCancel.bind(this)}
                onTitleChange={this.onTitleChange.bind(this)}
                onContentChange={this.onContentChange.bind(this)}
                title={this.state.review_title}
                content={this.state.review_content}
            ></ReviewModal>
            </div>
        );
    }
}

export default MovieList;