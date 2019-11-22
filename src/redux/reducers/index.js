import { combineReducers } from 'redux';

import user from './users' 

// 组件可以派发(dispatch)行为(action)给store,而不是直接通知其它组件
// 其它组件可以通过订阅store中的状态(state)来刷新自己的视图
// State的变化，会导致View的变化。但是，用户接触不到 State，只能接触到View 所以，State的变化必须是 View导致的。
// action就是改变state的指令，有多少操作state的动作就会有多少action。
export default combineReducers({
  user
})