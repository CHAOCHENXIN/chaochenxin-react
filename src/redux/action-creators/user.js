/*
  用来创建action对象
    同步action creator: 返回值就是action对象
    异步action creator: 返回值是一个函数，在函数中完成异步操作
*/
import { reqLogin } from '../../api/index'
import { GET_USER_SUCCESS,REMOVE_USER_SUCCESS } from '../action-types/user'

//同步: 数据都存储在同步里面，只是因为需要异步调用，所以
//才写了异步函数，暴露出去，然后在异步里面调用同步
//返回成功调用
const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  data: user
})

export const removeUserSuccess = () => ({
  type: REMOVE_USER_SUCCESS,
})

//改变状态

//流程：getUserAsync被调用，返回一个参数是dispatch的函数，这个函数再返回一个ajax请求的函数
//当then执行第一个函数时，说明请求发出去了，这个函数的参数response是请求的返回值，就是数据
//然后定义一个action，dispatch(action)调用 => action是一个命令，action => 为getUserSuccess(response)
//同步函数将response作为data的属性传入了user这个工厂函数中，工厂函数中，action就是response
//工厂返回action.data就是response.data也就是要更新成为的数据

export const getUserAsync = (username,password) => {
  return (dispatch) => {
    return reqLogin(username,password)
    //response是所有的数据
    .then( (response) => {
      //同步接受数据  action发出命令
      const action = getUserSuccess(response)
      dispatch(action)
      
      return response
    })
  }
}