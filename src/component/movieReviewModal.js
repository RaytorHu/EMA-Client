import React, { Component } from "react";
import { Input, Modal} from "antd";
import MovieReview from "./movieReview";

const { TextArea } = Input;

class ReviewModal extends Component{
    constructor(props) {
        super(props);
        //const findReview = this.props.findReview;
        //const index = findReview(this.props.movie_id);
        this.state = {
            visible: this.props.visible,
            title: '',
            content:'',
            reviews: this.props.reviews
            // reviews: this.props.reviews[index].records,
        }
    }

    componentWillReceiveProps(newProps) {
        // const findReview = this.props.findReview;
        // const index = findReview(this.props.movie_id);
        this.setState({
            visible: newProps.visible,
            reviews: newProps.reviews
            // reviews: newProps.reviews[index][1],
        });
        // console.log(this.state.reviews);
        this.forceUpdate();
    }

    render(){
        return(
            <div>
                <Modal
                    title="Movie Reviews"
                    visible = {this.state.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >
                        {/* <MovieReview reviews={this.state.reviews}/> */}
                        <label><strong>Add Review</strong></label><br/><br/>

                        <label>Title</label>
                        <Input
                            value={this.props.title}  
                            onChange={this.props.onTitleChange}                  
                        /><br/><br/>
                
                        <label>Review</label>
                        <TextArea rows={6}
                            value={this.props.content}
                            onChange={this.props.onContentChange}  
                        /><br/><br/>
                </Modal>
            </div>
        );
    }
}

export default ReviewModal;