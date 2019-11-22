//reducer 加工函数
// action发出命令后将state放入reucer加工函数中，返回新的state。 可以理解为加工的机器
import { GET_USER_SUCCESS,REMOVE_USER_SUCCESS } from '../action-types/user'
import { getItem } from '../../utils/storage'

const initUser = getItem('user') || {} 
//存储状态
const user = function (prevState = initUser,action) {
  //加工
  switch(action.type) {
    case GET_USER_SUCCESS:
      // action 就是 response
      return action.data;
    case REMOVE_USER_SUCCESS:
      return {};
    default:
      return prevState
  }
}

export default user