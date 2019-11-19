import React, { Component } from 'react';
import logo from './image/logo.png';
import { Form, Icon, Input, Button } from 'antd';
import './login.less';
import axios from 'axios';

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:5000/api/login',values)
        .then( response => {
          if (response.data.status === 0) {
            this.props.history.push('/')
          } else {
            alert('Hello wrold')
          }
        })
        .catch(e => alert('网络出现故障'))
        this.props.form.resetFields(["password"])
      } else {
        alert('你输入的格式有误')
        this.props.form.resetFields(["password"])
      }
    });
  }

  validator = (rule, value, callback) => {
    /*
      rule 用来获取当前校验的是哪个表单/Input
      value 当前表单项的值
      callback 不管校验成功还是失败 必须调用的函数
        callback() 代表校验成功
        callback('xxx') 代表校验失败
    */
  const id = rule.field == 'username' ? '用户名' : '密码'

   if (value.length <= 4) {
    callback(`${id}太短了`)
   } else if (value.length >= 16) {
    callback(`${id}太长了`)
   } else if (!/\w/.test(value)) {
    callback(`${id}的格式有误`)
   } else {
    callback()
   }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <div className='login-head'>
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </div>
        <div className='login-content'>
          <h3>用户登录</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                  /* { required: true, message: '用户名不能为空' },
                  { min: 4,message: '你太短了'},
                  { max: 12,message: '太长了'},
                  { pattern: /\w/,message: '你输入的格式有误'} */
                  validator: this.validator 
                  }
                  
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ validator: this.validator }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
              
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({})(Login);

export default WrappedNormalLoginForm