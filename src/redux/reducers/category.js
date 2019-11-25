import { GET_CATEGORIES_SUCCESS } from '../action-types/user';

//存储状态
const categories = function (prevState = [],action) {
  //加工
  switch(action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.data;
    default:
      return prevState
  }
}

export default categories