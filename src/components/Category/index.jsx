import React, { Component } from 'react';
import { Card,Table,Button,Icon,Modal } from 'antd';
import { connect } from 'react-redux';
import { getCategoriesAsync } from '../../redux/action-creators/category';
import { gitAddDataAsync,updateCategoryAsync,delCategoryAsync } from '../../redux/action-creators/addData';
import AddCategoryForm from './AddCategoryForm';
import UpaddCategoryForm from './UpaddCategoryForm.js';
import DelData from './deldata';

@connect( state => ({category: state.category}),{ delCategoryAsync,getCategoriesAsync,gitAddDataAsync,updateCategoryAsync })
class Category extends Component {

  state = { 
    category: {},
    visible: false,
    updateCategoryVisible: false,
    delData: false
  };

  //打开添加列表
  addCategory = () => {
    this.setState({
      visible: true,
    });
  };
  //添加分类
  okCategory = () => {
    this.AddCategoryForm.props.form.validateFields(async (err,values) => {
      if (!err) {
        await this.props.gitAddDataAsync(values.categoryName)
      }});
    this.setState({
      visible: false,
    });
    this.AddCategoryForm.props.form.resetFields();
  };
  //关闭添加列表
  noCategory = () => {
    this.setState({
      visible: false,
    });
    this.AddCategoryForm.props.form.resetFields();
  };

  //打开修改列表
  updateaddCategory = (category) => {
    return () => {
      this.setState({      
        updateCategoryVisible: true,
        category
      });
    }
  };
  //确认修改列表
  updateokCategory = () => {
    this.UpaddCategoryForm.props.form.validateFields(async (err,values) => {
      if (!err) {
        await this.props.updateCategoryAsync(this.state.category._id,values.categoryName)
      }});
      this.UpaddCategoryForm.props.form.resetFields();
      this.setState({
        updateCategoryVisible: false,
      });
  };
  //取消修改列表
  updatenoCategory = () => {
    this.setState({
      updateCategoryVisible: false
    })
    this.UpaddCategoryForm.props.form.resetFields();
  };

  //打开删除列表
  btndelData = (category) => {
    return () => {
      this.setState({      
        delData: true,
        category
      });
    }
  }
  //关闭删除列表
  nodelData = () => {
    this.setState({      
      delData: false,
    });
  }
  //确认删除列表
  okdelData = () => {  
    this.delDataForm.props.form.validateFields(async err => {
      if (!err) {
        await this.props.delCategoryAsync(this.state.category._id)
      }});
    this.setState({      
      delData: false
    });
  }

  //componentDidmount 是在组件完全挂载后才会执行
  componentDidMount() {
    this.props.getCategoriesAsync()
  };
  
  render() {    
    const { category } = this.props
    const {updateCategoryVisible} = this.state
    
    const columns = [
      {
        title: '品类名称',//表头
        dataIndex: 'name',//找data里面的key，取value
      },
      {
        title: '操作',
        render: category => {
          return <div>
            <Button type="link" onClick={this.updateaddCategory(category)}>修改分类</Button>
            <Button type="link" onClick={this.btndelData(category)}>删除分类</Button>
          </div>
        }
      }
    ];
    
    return (
      <div>
        <Card 
          title="分类列表" 
          extra={<Button type="primary" onClick={this.addCategory}>
            <Icon type="plus" />
            <span>添加</span>
          </Button>}>
          <Table
            columns={columns}
            dataSource={category}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['3','6','9','12'],
              defaultPageSize: 6
            }}
          />
        </Card>

        <Modal
          width={300}
          title="添加分类"
          visible={this.state.visible}
          onOk={this.okCategory}
          onCancel={this.noCategory}
        >
          <AddCategoryForm wrappedComponentRef={(form) => this.AddCategoryForm = form} />        
        </Modal>
        
        <Modal
          width={300}
          title="修改分类"
          visible={updateCategoryVisible}
          onOk={this.updateokCategory}
          onCancel={this.updatenoCategory}
        >
          <UpaddCategoryForm
          categoryName={this.state.category}
          wrappedComponentRef={(form) => this.UpaddCategoryForm = form} />        
        </Modal>
    
        <Modal
          width={300}
          title="删除分类"
          visible={this.state.delData}
          onOk={this.okdelData}
          onCancel={this.nodelData}
        >
          <DelData wrappedComponentRef={(form) => this.delDataForm = form} />        
        </Modal>

      </div>
    )
  }
}

export default Category