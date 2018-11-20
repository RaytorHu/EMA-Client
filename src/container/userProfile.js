import React, { Component } from 'react'
import { Card, Avatar, Button, Modal, Input, Row, Col, Tabs, Icon } from 'antd'
import storage from '../utils/Storage'
import AvatarUploader from '../component/avatarUploader'
import Following from '../container/following'
import Followers from '../container/followers'
const TabPane = Tabs.TabPane
const { Meta } = Card

class UserProfile extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    // TODO: validate input
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  componentDidMount () {
    this.setState({
      user: storage.getUserInfo()
    })
  }
  render () {
    return (
      <div>
        <Card
          cover={
            <img
              alt='example'
              src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            />
          }
          style={{ width: 400, left: 250 }}
          actions={[
            <div>
              <Button icon='edit' onClick={this.showModal} />
              <Modal
                title='Edit'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Row>
                  <Col span={8}>
                    <label>Username:</label>
                  </Col>
                  <Col span={16}>

                    <Input
                      defaultValue={this.state.user && this.state.user.username}
                    />
                  </Col>
                </Row>
                <br /><br />
                <Row>
                  <Col span={8}>
                    <label>Avatar:</label>
                  </Col>
                  <Col span={16}>

                    <AvatarUploader />
                  </Col>
                </Row>

              </Modal>
            </div>
          ]}
        >
          <Meta
            avatar={
              <Avatar src={this.state.user && this.state.user.avatarUrl} />
            }
            title={this.state.user && this.state.user.username}
            description={this.state.user && this.state.user.email}
          />
        </Card>

        <br /><br />

        <Tabs defaultActiveKey='1'>
          <TabPane tab={<span><Icon type='user' />Followings</span>} key='1'>
            <Following />
          </TabPane>
          <TabPane tab={<span><Icon type='user' />Followers</span>} key='2'>
            <Followers />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default UserProfile
