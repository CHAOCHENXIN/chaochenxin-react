import React, { Component } from 'react';
import { Form,Descriptions,Card,Icon } from "antd";
import { getCategoriesAsync } from '../../../redux/action-creators/category';
import { connect } from "react-redux";
import './index.less'

@Form.create()
@connect(state => ({category: state.category}),{ getCategoriesAsync })
class GoodsDetails extends Component {
  
  //发送Ajax请求
  componentDidMount () {
    if (!this.props.category.length) {
      this.props.getCategoriesAsync()
    }
  }

  //返回页面
  goBack = () => {
    this.props.history.push('/product')
  }

  render() {
    let nameId = '未选择'
    const { name, desc, price, categoryId, detail,status } = this.props.history.location.state
    this.props.category.forEach( (item) => {
      if (item._id === categoryId) {
        nameId = item.name
      }
    })
    
    return (
      <Card
        title={
          <div onClick={this.goBack} className="gi-back">
            <Icon type="arrow-left" />
            &nbsp;&nbsp;添加商品
          </div>
        }
      >
      <Descriptions title="商品详情 " bordered column={2}>
        <Descriptions.Item label="商品名称:">{name}</Descriptions.Item>
        <Descriptions.Item label="商品描述:">{desc}</Descriptions.Item>
        <Descriptions.Item label="商品价格:">${price}</Descriptions.Item>
        <Descriptions.Item label="商品分类:">{nameId}</Descriptions.Item>
        <Descriptions.Item label="商品状态:">
          {status === 1 ? '上架' : '下架'}
        </Descriptions.Item>
        <Descriptions.Item label="商品详情:">
        <div dangerouslySetInnerHTML={{ __html: detail }}></div>
        </Descriptions.Item>
      </Descriptions>
      </Card>
    )
  }
}

export default GoodsDetails