import React, { Component } from "react";
class Movie extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentWillMount(){
        const url = 'https://clapperboard-api.azurewebsites.net/v1/movies';
        fetch(url)
            .then((response=>response.json()))
            .then((responseJson)=>{

            })
    }

    render() {
        return <div>Movie page</div>;
    }
}

export default Movie;