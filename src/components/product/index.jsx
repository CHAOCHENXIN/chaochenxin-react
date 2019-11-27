import React, { Component } from 'react';
import {Card,Table,Select,Input,Button,Icon, message} from 'antd';
import { reqGetProducts,goodsStateGory } from '../../api/index';
import './index.less';

export default class Product extends Component {

  state = {
    products:[],
    total: 0,
    status: ''
  }

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '状态',
      // dataIndex: 'status',
      render: (item) => {
        return <div>
          <Button type="primary" onClick={this.goodsState(item)}>
            {item.status === 1 ? '上架' : '下架'}
          </Button>
          {item.status === 1 ? '已下架' : '已上架'}
        </div>
      }
    },
    {
      title: '操作',
      render: (goods) => {
        return <div>
          <Button type="link" onClick={this.GoodsDetails(goods)}>详情</Button>
          <Button type="link" onClick={this.Modify(goods)}>修改</Button>
        </div>
      }
    },
  ]

  //更新状态
  goodsState = (item) => {
    const status = 3-item.status
    const productId = item._id
    return () => {
      goodsStateGory({status,productId}).then( (res) => {
        message.success('数据更新成功')
        this.setState({
          products: this.state.products.map( (i) => {
            if (i._id === productId) {
              return {...i,status}
            }
            return i
          })
        })        
      })
    }
  }

  //商品详情
  GoodsDetails = (goods) => {
    return () => {
      this.props.history.push('/product/detail',goods)
    }
  }
   //修改商品
   Modify = (goods) => {
    return () => {
      this.props.history.push('/product/saveupdate',goods)
    }
  }
  //添加商品
  showAddCategoryForm = () => {
    this.props.history.push('/product/add')
  }

  //发送Ajax请求页面数据
  getProducts = async (pageNum,pageSize) => {
    const result = await reqGetProducts(pageNum,pageSize)
    this.setState({
      products: result.list,
      total: result.total
    })    
  }

  componentDidMount() {
    this.getProducts(1,6)
  }

  render() {
    const {products,total} = this.state
    return (
      <Card
        title={
          <div>
            <Select value={1}>
              <Select.Option key={1}>根据商品名称</Select.Option>
              <Select.Option key={2}>根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" className="search-input" />
            <Button type="primary">搜素</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.showAddCategoryForm}>
            <Icon type="plus"/>
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['3','6','9','12'],
              defaultPageSize: 6,
              total,
              onChange: this.getProducts,
              onShowSizeChange: this.getProducts
            }}
         />
      </Card>
    )
  }
}
