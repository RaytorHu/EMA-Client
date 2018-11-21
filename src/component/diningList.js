import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import storage from '../utils/Storage'
import FriendList from './friendList'
import { List, Avatar, Icon, Rate, Input, Button } from 'antd'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

class DiningList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listData: [],
      displayData: [],
      favRestaurants: [],
      loading: true,
      theme: '',
      isFav: 'Add to Favorite'
    }
  }

  extractList () {
    const listData = this.state.listData
    const tmp = []
    for (let i = 0; i < listData.length; i++) {
      tmp.push({
        address: listData[i].address,
        city: listData[i].city,
        id: listData[i].id,
        image_url: listData[i].image_url,
        name: listData[i].name,
        phone: listData[i].phone,
        price: listData[i].price,
        rating: listData[i].rating,
        review_count: listData[i].review_count,
        url: listData[i].url,
        isFav: '',
        favMsg: 'Add to Favorite'
      })
      for (let j = 0; j < this.state.favRestaurants.length; j++) {
        if (listData[i].id === this.state.favRestaurants[j].rest_id) {
          tmp[i].isFav = 'filled'
          tmp[i].favMsg = 'Remove from Favorite'
        }
      }
    }
    this.setState({
      displayData: tmp
    })
  }

  getFavorite () {
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/dining/search',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.setState({
          favRestaurants: Array.from(response.data.data)
        })
        this.extractList(response)
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      listData: newProps.listData,
      loading: newProps.loading
    })

    this.getFavorite(newProps)
    this.forceUpdate()
  }

  addFavRestaurant = item => {
    axios({
      method: 'post',
      url: config.base_url + 'api/v1/dining',
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      },
      data: {
        rest_id: item.id,
        name: item.name
      }
    })
      .then(response => {
        this.getFavorite()
      })
      .catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
      })
  }

  removeRestaurant = item => {
    axios({
      method: 'delete',
      url: config.base_url + 'api/v1/dining/' + item.id,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    })
      .then(response => {
        this.getFavorite()
      })
      .catch(err => {
        console.log(err)
        alert('Unexpected error occured. Please try again later')
      })
  }

  HandleClick = item => {
    if (item.isFav === '') {
      this.addFavRestaurant(item)
    } else {
      this.removeRestaurant(item)
    }
  }

  render () {
    return (
      <div>
        <List
          itemLayout='vertical'
          size='large'
          loading={this.state.loading}
          pagination={{
            onChange: page => {
              console.log(page)
            },
            pageSize: 5
          }}
          dataSource={this.state.displayData}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={[
                <IconText type='star-o' text={item.review_count} />,
                <Rate allowHalf disabled defaultValue={item.rating} />,
                <p>{item.price || 'N/A'}</p>,
                <Button onClick={() => this.HandleClick(item)}>
                  <Icon type='heart' theme={item.isFav} />
                  {item.favMsg}
                </Button>,
                <FriendList content={item.name} />
              ]}
              extra={<img width={272} alt='logo' src={item.image_url} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image_url} />}
                title={<a href={item.url}>{item.name}</a>}
                description={item.phone}
              />
              {item.address + ', ' + item.city}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default DiningList
