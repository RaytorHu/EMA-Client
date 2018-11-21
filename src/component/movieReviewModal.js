import React, { Component } from "react";
import { Input, Modal} from "antd";
import MovieReview from "./movieReview";
import config from "../config.js";
import axios from "axios";
import storage from "../utils/Storage";

const { TextArea } = Input;

class ReviewModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            title: '',
            content:'',
            target:[],
        }
    }

    componentWillReceiveProps(newProps) {
        let newList = [];
        for(let i =0; i < newProps.reviews.length; i++){
            if(newProps.reviews[i].userId === newProps.userID || this.props.permission){
                newList.push({
                    id: newProps.reviews[i].id,
                    title: newProps.reviews[i].reviewTitle,
                    content: newProps.reviews[i].reviewContent,
                    userName: newProps.reviews[i].userId,
                    btnShow: 'block'
                });
            }
            else{
                newList.push({
                    id: newProps.reviews[i].id,
                    title: newProps.reviews[i].reviewTitle,
                    content: newProps.reviews[i].reviewContent,
                    userName: newProps.reviews[i].userId,
                    btnShow: 'none'
                });
            }
        }
        this.setState({
            visible: newProps.visible,
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