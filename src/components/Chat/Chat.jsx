import Taro, { Component} from '@tarojs/taro'
import { View, Text, Image ,Form,Input,Button} from '@tarojs/components'
import './Chat.css'



export default class Chat extends Component {
    constructor(props){
        super(props)
    }
    
    
    state = {
        title: "正在跟篮子哥对线ing",
        headReight: 'http://pic3.zhimg.com/50/v2-ce1ae5fc3b55a7c248f04f5123bb38ba_hd.jpg',
        saysList:[
            // {
            //     'isay':'你好',
            //     'robot':'我是机器人，你好'
            // }
        ],
        textContent:'',
    }

    config = {
        navigationBarTitleText: '智能语音'
    }

    componentDidShow() { }

    //form提交事件
    converSation(e){
        this.deleteChat()
        let that = this
        let say ={
            isay:e.detail.value.says
        } 
        if(!say.isay){
            Taro.showToast({
                title: '没有内容',
                icon: 'none',
                duration: 1000
            })
        }else{
            /**执行
             * 在线聊天机器人：文字api接口，需要在线申请并获得key后才能调用
             * 现在网上比较多的是，图灵机器人 
             */
            // let key ='e0dc078b05ed4034bc26709c6ca04196'
            // console.log(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${say.isay}`);
            Taro.request({
                // url:`http://www.tuling123.com/openapi/api?key=${key}&info=${say.isay}`
                url: `http://api.qingyunke.com/api.php?key=free&appid=0&msg=${say.isay}`
            }).then(res=>{
                if(res.data.content){
                    say["robot"] = res.data.content
                    let _sasylist = that.state.saysList
                    //把当前saysList的长度获取到
                    let length = _sasylist.length
                    _sasylist[length] = say
                    that.setState({
                        saysList:_sasylist
                    })
                    // console.log(that.state.saysList)
                }
            }).catch(err=>{
                console.log('err',err)
            })
        }
        
    }

    handleChange =(e)=>{
        this.setState({
            textContent: e.target.value
        })
    }
    //清空聊天记录
    deleteChat=()=>{
    //   this.setState(()=>{
    //     textContent : ''
    //   })
        this.setState({
            textContent:''
        })
        
      console.log('delete',this.state);
    }
    
    render() {
        return (
            <View>
                <View className='lanziBg'>
                <View className='top'>{this.state.title}</View>
                <View className='que'>
                    {/* 聊天对答区域 */}
                    {this.state.saysList.map((item,index)=>{
                        return (
                            <View className='con' taroKey={index}>
                            {/* 我说 */}
                            <View className='isay'>
                                <View className='r-t'>
                                    <Text>{item.isay}</Text>
                                </View>
                                <View className='r-i'>
                                    <Image src={this.state.headReight}></Image>
                                </View>
                            </View>
                            {/* 机器人说 */}
                            <View className='robort'>
                                <View className='l-i'>
                                    <Image src='http://wx1.sinaimg.cn/orj480/c3db55f8ly1gcr97lzzfij20f40ggmy2.jpg'></Image>
                                </View>
                                <View className='l-t'>
                                    <Text>{item.robot}</Text>
                                </View>
                            </View>
                               
                        </View>
                     ) })}
                    
                    
                    {/* 发送内容聊天 */}
                    <View className='send'>
                        <View className='input'>
                            <Form onSubmit={this.converSation}>
                                <Input className='text' name='says' value={this.state.textContent} onChange={this.handleChange} />
                                <Button className='btn' id='btn' form-type='submit'>对线</Button>
                                <Button className='btn-d' onClick={this.deleteChat}>清空</Button>
                            </Form>
                        </View>
                    </View>


                </View>
                </View>
            </View>
        )
    }
}