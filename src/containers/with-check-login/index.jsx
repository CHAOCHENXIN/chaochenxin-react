import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// connect：把 redux 的 dispatch 和 state 映射为 react 组件的 props
const withCheckLogin  = WrappedComponent  => {
  
  //高阶组件返回值是一个新的组件
  //connet可以将这个函数的属性和方法以props的值传给子组件
  return connect(
    //状态数据
    state => ({token: state.user.token}),
    //更新状态数据的方法
    null 
  )(
    class extends Component {
      static displayName = `CheckLogin(${WrappedComponent.displayName || WrappedComponent.name||'Component'})`
      render () {
        const { token,location, ...rest } = this.props

        if (location.pathname == '/login') {
          if (token) {
            return <Redirect to='/' />
          }
        } else {
          if (!token) {
            //跳转地址
            return <Redirect to='/login' />
          }
        }
        //返回原组件
        return <WrappedComponent {...rest} location={location} />
      }
    }
  )
}


export default withCheckLogin