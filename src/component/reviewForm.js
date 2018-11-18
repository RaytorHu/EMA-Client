import React, { Component } from "react";
import addReview from "./addMovieReview";

class ReviewForm extends Component{
    render(){
        return(
            <div>
                <addReview/>
            </div>
        )
    }
}

export default ReviewForm;