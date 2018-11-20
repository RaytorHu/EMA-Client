import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import { Button, Icon, Tooltip, Spin } from 'antd'
class Invite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  invite = () => {
    console.log(this.props.user.email)
  }

  render () {
    return (
      <div className='App'>

        <Tooltip title='Invite' placement='right'>
          <Button onClick={this.invite}>
            <Icon type='mail' />
          </Button>
        </Tooltip>

      </div>
    )
  }
}

export default Invite
