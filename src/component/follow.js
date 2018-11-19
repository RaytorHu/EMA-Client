import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import { Button, Icon, Tooltip } from 'antd'
class Follow extends Component {
  state = {
    followed: false
  }
  constructor (props) {
    super(props)
    this.state = {
      followed: false
    }
  }
  follow = () => {
    axios({
      method: 'POST',
      url: config.base_url + 'api/v1/user/followings/' + this.props.user.id,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        followed: true
      })
    })
  }
  unfollow = () => {
    axios({
      method: 'DELETE',
      url: config.base_url + 'api/v1/user/followings/' + this.props.user.id,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        followed: false
      })
    })
  }
  render () {
    return (
      <div className='App'>
        {!this.state.followed &&
          <Tooltip title='Follow' placement='right'>
            <Button onClick={this.follow}><Icon type='star' /></Button>
          </Tooltip>}
        {this.state.followed &&
          <Tooltip title='Unfollow' placement='right'>
            <Button onClick={this.unfollow}>
              <Icon type='star' theme='filled' />
            </Button>
          </Tooltip>}
      </div>
    )
  }
}

export default Follow
