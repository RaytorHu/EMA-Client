import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import { Button, Icon, Tooltip } from 'antd'
class FavRes extends Component {
    constructor(props) {
        super(props);
        console.log("geteget " + this.props.rest.isFav);
        this.state = {
            isFav: this.props.rest.isFav,
            favMsg: this.props.rest.favMsg,
        }
    }
    componentDidMount() {
        console.log("didmount " + this.props.rest.isFav);
        this.setState({
            isFav: '',
            favMsg: 'Add to Favourite'
        })
    }
    // componentDidUpdate (prevProps) {
    //     if (this.props.rest !== prevProps.rest) {
    //       //this.isFollowing()
    //     }
    //   }

    addFavRestaurant = () => {
        //console.log(item.id);
        axios({
            method: 'POST',
            url: config.base_url + 'api/v1/dining/',
            headers: {
                'Authorization': 'Bearer ' + storage.getAuthToken()
            },
            data: {
                rest_id: this.props.rest.id,
                name: this.props.rest.name,
            }
        }).then(response => {
            console.log("GOT!")
            this.setState({
                isFav: 'filled',
                favMsg: 'Remove from Favourite',
            });
            //this.extractList(response);
        }).catch((err) => {
            throw new Error(err)
        });
    }

    render() {
        return (
            <div>
                <Button onClick={
                    this.addFavRestaurant
                } >
                    <Icon type="heart" theme={this.state.isFav} />
                    {this.state.favMsg}
                </Button>
                {/* {!this.state.followed &&
          <Tooltip title='Follow' placement='right'>
            <Button onClick={this.follow} loading={this.state.loading}>
              <Icon type='star' />
            </Button>
          </Tooltip>}
        {this.state.followed &&
          <Tooltip title='Unfollow' placement='right'>
            <Button onClick={this.unfollow} loading={this.state.loading}>
              <Icon type='star' theme='filled' />
            </Button>
          </Tooltip>} */}

            </div>
        )
    }
}

export default FavRes
