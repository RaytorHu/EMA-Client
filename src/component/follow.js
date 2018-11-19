import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import { Button, Icon, Tooltip, Spin } from 'antd'
class Follow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentDidMount () {
    var res = axios({
      method: 'GET',
      url: config.base_url + 'api/v1/user/follows/' + this.props.user.id,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.setState({
          loading: true,
          followed: response.data.isFollowing
        })
        return this.state.loading
      })
      .then(async response => {
        if (response === true) {
          return await this.setState({
            loading: false
          })
        }
      })
  }
  follow = () => {
    axios({
      method: 'POST',
      url: config.base_url + 'api/v1/user/followings/' + this.props.user.id,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(() => {
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
    }).then(() => {
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
            <Button onClick={this.follow} loading={this.state.loading}>
              <Icon type='star' />
            </Button>
          </Tooltip>}
        {this.state.followed &&
          <Tooltip title='Unfollow' placement='right'>
            <Button onClick={this.unfollow} loading={this.state.loading}>
              <Icon type='star' theme='filled' />
            </Button>
          </Tooltip>}

      </div>
    )
  }
}

export default Follow
