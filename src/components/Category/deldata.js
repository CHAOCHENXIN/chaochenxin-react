import React, { Component } from 'react';
import {Form} from 'antd';

@Form.create()
class DelData extends Component {
  render() {
    return (
      <Form>
        <Form.Item label="你确定要删除名称吗?">
        </Form.Item>
      </Form>
    )
  }
}

export default DelData