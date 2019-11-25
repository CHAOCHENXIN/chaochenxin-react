import React, { Component } from 'react';
import { Card,Table,Button,Icon } from 'antd'; 
import { connect } from 'react-redux';
import { getCategoriesAsync } from '../../redux/action-creators/category';

@connect( state => ({category: state.category}),{ getCategoriesAsync })
class Category extends Component {

  //componentDidmount 是在组件完全挂载后才会执行
  componentDidMount() {
    this.props.getCategoriesAsync()
    //是因为数据还没有刷新吗？
    console.log(this.props.category);
  }

  render() {
    const { category } = this.props
    const columns = [
      {
        title: '品类名称',//表头
        dataIndex: 'name',//找data里面的key，取value
      },
      {
        title: '操作',
        render:() => {
          return <div>
            <Button type="link">修改分类</Button>
            <Button type="link">删除分类</Button>
          </div>
        }
      }
    ];

    

    return (
      <div>
        <Card title="分类列表" 
          extra={<Button type="primary">
            <Icon type="plus" />
            <span>添加</span>
          </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={category}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['3','6','9','12'],
              defaultPageSize: 3
            }}
          />
        </Card>
      </div>
    )
  }
}

export default Category