import React, { Component } from "react";
class Movie extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
    }

    componentWillMount(){
        //https://clapperboard-api.azurewebsites.net/v1/movies
        const url = 'https://facebook.github.io/react-native/movies.json';
        fetch(url)
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log(responseJson)
                this.setState({
                    data: responseJson.movies,
                })
                //console.log('in response')
            })
            .catch(function(error){
                //console.log('failure')
                console.log(JSON.stringify(error));
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.data.map((record, key)=>
                        <div>
                            <span>{record.title}</span>
                            <span>{record.releaseYear}</span>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Movie;