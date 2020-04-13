import Taro, { Component } from '@tarojs/taro'
// import { View, Text } from '@tarojs/components'
import './index.less'
import Chat from '../../components/Chat/Chat'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () {


  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '保安日记'
  }
  
  render () {
    return (
      <Chat></Chat>
    )
  }
}
