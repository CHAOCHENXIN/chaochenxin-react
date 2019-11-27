import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Icon,
  InputNumber,
  Button,
  message
} from "antd";
import { connect } from "react-redux";
import { getCategoriesAsync } from '../../../redux/action-creators/category';
import { modifyGoods } from '../../../api'
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import "./index.less";

@Form.create()
@connect(state => ({category: state.category}),{ getCategoriesAsync })
class Modify extends Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null)
  }

  //发送Ajax请求
  componentDidMount () {
    if (!this.props.category.length) {
      this.props.getCategoriesAsync()
    }
  }

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  //正则校验
  validator = (_,value,callback) => {
    if (!value||value.isEmpty()) {
      callback("请输入商品详情")
    } else {
      callback ()
    }
  }

  //提交按钮
  addProduct = (e) => {
    e.preventDefault()

    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        const productId = this.props.history.location.state._id
        const { name, desc, price, categoryId, editorState } = values
        const detail = editorState.toHTML()
        await modifyGoods({productId, name, desc, categoryId, price, detail})
        message.success("添加商品成功")
        this.props.history.push('/product')
      } 
    })
  }

  //返回页面
  goBack = () => {
    this.props.history.push('/product')
  }

  render() {
    
    const { name, desc, price, categoryId, detail } = this.props.history.location.state
    
    //getFieldDecorator:用于和表单进行双向绑定
    const { category,form:{ getFieldDecorator } } = this.props

    return (
      <Card
        title={
          <div onClick={this.goBack} className="gi-back">
            <Icon type="arrow-left" />
            &nbsp;&nbsp;添加商品
          </div>
        }
      >
        <Form labelCol={{span: 4}} wrapperCol={{span: 8}} onSubmit={this.addProduct}>
          <Form.Item label="商品名称" >
            {getFieldDecorator("name",{
              rules: [{required: true,message: '请输入商品名称'}]
              ,initialValue: name
            })(<Input placeholder='请输入商品名称' />)}
          </Form.Item>
          <Form.Item label="商品描述" >
            {getFieldDecorator("desc",{
              rules: [{required: true,message: '请输入商品描述'}]
              ,initialValue: desc
            })(<Input placeholder='请输入商品描述' />)}
          </Form.Item>
          <Form.Item label="商品分类" >
            {getFieldDecorator("categoryId",{
              rules: [{required: true,message: '请选择商品分类' }]
              ,initialValue: categoryId
            })(
              <Select placeholder="请选择商品分类">
                {
                  category.map( (item) => {
                    return <Select.Option key={item._id} value={item._id}>
                      {item.name}
                    </Select.Option>
                  })
                }
              </Select>
              )}
          </Form.Item>
          <Form.Item label="商品价格" >
            {getFieldDecorator("price",{
              rules: [{required: true,message: '请输入商品价格' }]
              ,initialValue: price
            })(<InputNumber
                style={{width: 150}}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
              )}
          </Form.Item>
          <Form.Item label="商品详情" wrapperCol={{ span: 15 }} >
            {getFieldDecorator("editorState",{
              rules: [{required: true,validator: this.validator }]
              ,initialValue: BraftEditor.createEditorState(detail)
            })((
              <BraftEditor
                className="rich-text-editor"
                placeholder="请输入商品详情"
              />
            ))}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Modify