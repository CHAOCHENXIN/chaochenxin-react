import React, { Component } from 'react';
import {Input,Form} from 'antd';
import PropTypes from 'prop-types';

@Form.create()
class UpaddCategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };

  validator = (rule,value,callback) => {
    if(!value) {
      callback('请输入分类名称')
    } else {
      callback()
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const { categoryName } = this.props
    
    return (
      <Form> 
        <Form.Item label="品类名称">
          {getFieldDecorator('categoryName',
          {rules:[
            { validator: this.validator}
          ],
            initialValue: categoryName.name
          })(<Input placeholder="请输入分类名称" />)}
        </Form.Item>
      </Form>
    )
  }
}

export default UpaddCategoryForm