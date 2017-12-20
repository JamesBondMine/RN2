/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    Alert,
    TouchableHighlight,//点击效果
    TouchableNativeFeedback,
    TextInput,
    Image,
    NavigatorIOS,//导航控制器
    sectionHeader,
    TouchableOpacity,
    NativeModules
} from 'react-native';

let {
    width,
    height
} = Dimensions.get('window');
var RNModules = NativeModules.RTModule;
export default class RN2 extends Component {
    constructor(props) {
        super(props);

        const JS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
        dataSource: JS.cloneWithRows([
                                      '回到那片操场 旧食堂 烧鸭饭 依然香T0Thttps://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg',
                                      '你的马尾飘扬 就连背影都发亮 多么想能被你爱上 回到那片沙滩 风微凉 听海浪 唱一唱T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=956735877,215936670&fm=11&gp=0.jpg',
                                      '你的马尾飘扬 就连背影都发亮 多么想能被你爱上 回到那片沙滩 风微凉 听海浪 唱一唱T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3510992391,970315798&fm=200&gp=0.jpg',
                                      '你聆听我弹唱 我写的歌 你每一首喜欢 弹着明天为你唱 你不在乎什么地方 回到那食堂 那片沙滩T0Thttps://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=227953490,3054069314&fm=27&gp=0.jpg',
                                      '你聆听我弹唱 我写的歌 你每一首喜欢 弹着明天为你唱 你不在乎什么地方 回到那食堂 那片沙滩T0Thttps://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=960958117,1709091495&fm=27&gp=0.jpg',
                                      '爱纯真也疯狂 向往那么一天 临睡前 我枕头边 你素颜 祈求你的睡眠 要比我的还香甜 说好吧T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2875524332,436336741&fm=11&gp=0.jpg',
                                      '爱纯真也疯狂 向往那么一天 临睡前 我枕头边 你素颜 祈求你的睡眠 要比我的还香甜 说好吧T0Thttps://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1615575634,4119176251&fm=11&gp=0.jpg',
                                      '在梦里相见 你在的片段 我用心收藏 你聆听我弹唱 我写的歌 你每一首喜欢T0Thttps://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1943249770,628140654&fm=200&gp=0.jpg'
                                      ])
        };
    }
    
  render() {
    return (
      <View style={styles.container}>

          <ListView  initialListSize = {5}//这个属性用来指定我们第一次渲染时，要读取的行数
            dataJs={this.state.dataJs}
            dataSource = {this.state.dataSource}
            renderRow  = {(rowData) =>
            

            <View style={{backgroundColor:'white',marginBottom:20}}>
                <Image source={{uri:rowData.split('T0T')[1]}} style={{marginBottom:15,width:120,height:50}}>
                </Image>

                <TouchableOpacity
                    onPress={()=>{//在这里操作数据
                        var str1222 = "jpg|bmp|gif|ico|png";
                        console.log('___点击了文字：',str1222)
                        RNModules.RNOpenOneVC(rowData.split('T0T')[1])
                    }}>

            <Text style = {{color:'green', marginBottom:10,width: width}}>{rowData.split('T0T')[0]}
            </Text>

            </TouchableOpacity>
            



                <TouchableOpacity

                    onPress={()=>{//在这里操作数据

                        var str1222 = "Second";

                        RNModules.RNOpenOneVC(str1222)

                        console.log('___点击了链接：',str1222)
                    }}>

                    <Text style={{color:'red', width: width}}>{rowData.split('T0T')[1]}

                    </Text>

                </TouchableOpacity>
            
            
            

                <TouchableHighlight style = {{backgroundColor:'pink',width:width,marginBottom:1,height:36,justifyContent:'center',alignItems:'center',margin:0}}

                                    onPress={

                                        ()=> {
            

                                            var str1 = "jpg|bmp|gif|ico|png";

                                            var arr = str1.split("|");

                                            var newary = arr.slice(0, 2);

                                            console.log(arr)

                                            console.log(newary)
            console.log(rowData)
            console.log(rowData.split("com").slice(0, 1))
            Alert.alert(
                        `你点击了按钮`,
                        'Hello World！',
                        [{text: '以后再说', onPress: () =>
                         console.log('点击了以后再说')
                         },
                         {text: '取消', onPress: () =>
                         console.log('点击了取消'), style: 'cancel'},
                         {text: '确定', onPress: () =>
                         console.log('点击了确定吧',str1)
                         
                         },
                         
                         ]
                        )
            }
            }>
            <Text style={{color:'white',fontSize:17}}>
            跳转
            </Text>
            </TouchableHighlight>
            
            
            </View>
            }
            style = {{width:width,height:height - 64}}>
            </ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
                                 
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RN2', () => RN2);
