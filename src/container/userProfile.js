import React, { Component } from 'react'
import { Card, Icon, Avatar } from 'antd'
import storage from '../utils/Storage'
const { Meta } = Card

class UserProfile extends Component {
  state = {}
  componentDidMount () {
    this.setState({
      user: storage.getUserInfo()
    })
  }
  render () {
    return (
      <div>
        <Card style={{ width: '70%', left: 120 }}>
          <Meta
            avatar={
              <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            }
            title={this.state.user && this.state.user.username}
            description={this.state.user && this.state.user.email}
          />
        </Card>
      </div>
    )
  }
}

export default UserProfile
