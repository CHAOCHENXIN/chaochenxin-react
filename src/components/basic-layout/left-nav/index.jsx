import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react';
import logo from '../../../containers/login/image/logo.png'
import { Link,withRouter } from 'react-router-dom'
import shux from '../../home/shux';
import '../home.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    let a = ''
    shux.forEach( (index) => {
      if (index.child) {
        index.child.forEach( (menu) => {
          if (menu.path == this.props.pathname) {
            a = index.path
          }
        })
      }
    })

    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo">
          <img src={logo} alt='logo' />
          <span>硅谷后台</span>
        </div>
        
        <Menu theme="dark" defaultSelectedKeys={[this.props.pathname]} 
        defaultOpenKeys={[a]} mode="inline">
          {shux.map( (index) => {
            if (index.child) {
              return <SubMenu
                key={index.path}
                title={
                  <span>
                    <Icon type={index.icon} />
                    <span>{index.value}</span>
                  </span>
                }
              >
                {
                  index.child.map( (index) => {
                    return <Menu.Item key={index.path}>
                      <Link to={index.path}>
                        <Icon type={index.icon} />
                        <span>{index.value}</span>
                      </Link>
                    </Menu.Item>
                  })
                }
              </SubMenu>
            } else {
            return <Menu.Item key={index.path}>
                <Link to={index.path}>
                  <Icon type={index.icon} />
                  <span>{index.value}</span>
                </Link>
              </Menu.Item>
            }
          })}
        </Menu>
      </Sider>
    );
  }
}

export default LeftNav