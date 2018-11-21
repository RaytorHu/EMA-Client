import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd'
import config from '../config.js'
import storage from '../utils/Storage'
import axios from 'axios'

class FavRestList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      restaurants: []
    }
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/dining/search',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      this.setState({
        restaurants: response.data.data,
        loading: false
      })
    })
  }

  render () {
    return (
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5
        }}
        dataSource={this.state.restaurants}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item.image_url} />}
              title={item.name}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default FavRestList
