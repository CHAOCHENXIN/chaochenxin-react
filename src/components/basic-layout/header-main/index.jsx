import React, { Component } from 'react'
import { Modal,Button } from 'antd';
import './index.less';
import screenfull from 'screenfull';
import store from '../../../redux/store';
import { removeItem } from '../../../utils/storage';
import { removeUserSuccess } from '../../../redux/action-creators/user';
import shux from '../../home/shux';
import dayjs from 'dayjs';
import { withTranslation } from 'react-i18next';

@withTranslation()
class HeaderMain extends Component {

  state = {
    screen: true,
    screenIcon: 'fullscreen',
    time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    isEnglish: this.props.i18n.language === 'en' ? true : false
  }

  //退出登录
   showConfirm = () => {
    Modal.confirm({
      title: '您确认要退出吗?',
      onOk: () => {
        //清空本地token（localStorage、redux） 重定向到 /login
        removeItem('user')
        //调用命令就会生成action
        store.dispatch(removeUserSuccess())
      },
      onCancel() {}
    })
  }

  //全屏
  ChangeScreen = () => {
    screenfull.toggle();
  }

  componentDidMount () {

    //时间变换
    setInterval( () => {
      this.setState({
        time: dayjs().format('YYYY/MM/DD HH:mm:ss')
      })
    },1000)

    screenfull.on('change',() => {
      if (this.state.screen) {
        //全屏
        this.setState({
          screenIcon: 'fullscreen-exit'
        })
      }else{
        //退出全屏
        this.setState({
          screenIcon: 'fullscreen'
        })
      }
      this.setState({
        screen: !this.state.screen  
      })
    })
  }
 
  //切换语言
  changeLang = () => {
    this.setState({
      isEnglish: !this.state.isEnglish
    })
    this.props.i18n.changeLanguage(this.state.isEnglish ? 'zh' : 'en');    
  }

  render() {
    let value = ''
    const { t } = this.props
    return (
      <div>
        <div className="header-main-btn">
          <Button icon={this.state.screenIcon} onClick={this.ChangeScreen}></Button>        
          <Button onClick={this.changeLang}>
            {this.state.isEnglish ? '中文' : 'English'}
          </Button>
          <span>欢迎, {store.getState().user.user.username}</span>
          <Button type="link" onClick={this.showConfirm}>退出</Button>
        </div>
        <div className="header-main-bottom">
          <span>
            {
              shux.forEach( item => {
                if (!item.child) {
                  if (item.path === window.location.pathname) {
                    value = t("layout.leftNav." + `${item.value}`)
                  }
                } else {
                  item.child.forEach( (childItem ) => {
                    if (window.location.pathname.search(childItem.path) != -1) {
                      value = t("layout.leftNav." + `${childItem.value}`)
                    }
                  })
                }
              })
            }
            {value}
          </span>
          <div>{this.state.time}</div>
          <div className="sanjiao"></div>
        </div>
      </div>
    )
  }
}


export default HeaderMain