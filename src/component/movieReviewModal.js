import React, { Component } from "react";
import { Input, Modal} from "antd";
import MovieReview from "./movieReview";

const { TextArea } = Input;

class ReviewModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            title: '',
            content:'',
            reviews: this.props.reviews,
            target:[],
        }
    }

    componentWillReceiveProps(newProps) {
        let newList = [];
        for(let i =0; i < this.state.reviews.length; i++){
            if(newProps.reviews[i][0] === this.props.movie_id){
                let target = newProps.reviews[i][2];
                if(newProps.reviews[i][1] === newProps.userID || newProps.reviews[i][1] == newProps.permission){
                    target.push(false);
                }
                else{
                    target.push(true);
                }
                newList.push(target);
            }
        }
        this.setState({
            visible: newProps.visible,
            reviews: newProps.reviews,
            target: newList
        });
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
                        <MovieReview 
                            reviews={this.state.target}
                            onDelete={this.props.onDelete}
                        />
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