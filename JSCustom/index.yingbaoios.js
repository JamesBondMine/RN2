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
    Image,
    ListView,
    ScrollView,
    Dimensions,
    NativeModules,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

let {
    width,
    height
} = Dimensions.get('window');


var JSDimensions = require('Dimensions');

var imageData = [
                 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=882642063,4115591772&fm=27&gp=0.jpg',
                 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1081553651,2562369762&fm=11&gp=0.jpg',
                 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2021991128,2296584601&fm=27&gp=0.jpg',
                 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082175366,4120772079&fm=11&gp=0.jpg'
                 ];

var RNModules = NativeModules.RTModule;
export default class RN2 extends Component {
    state: {dataSource: any};
    constructor(props) {
        super(props);
         this.state = {
             currentPage:0,
             selectedImageIndex: 0,
             isNeedRun: true,
         };


        this._contentOffsetX = 0;
        this._index = 0;// 当前正在显示的图片
        this._max = imageData.length;// 图片总数


        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });


        const JS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            totalPrice: 0,
            dataSource: JS.cloneWithRows([
                                      '22T0Thttps://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg',
                                      '23T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=956735877,215936670&fm=11&gp=0.jpg',
                                      '24T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3510992391,970315798&fm=200&gp=0.jpg',
                                      '25T0Thttps://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=227953490,3054069314&fm=27&gp=0.jpg',
                                      '26T0Thttps://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=960958117,1709091495&fm=27&gp=0.jpg',
                                      '27T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2875524332,436336741&fm=11&gp=0.jpg',
                                      '28T0Thttps://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1615575634,4119176251&fm=11&gp=0.jpg',
                                      '29T0Thttps://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1943249770,628140654&fm=200&gp=0.jpg'
                                      ])

        };
        this._renderRow = this._renderRow.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    componentDidMount() {
        this.requestFilmActivityData()

        let timer = setTimeout(()=>{
            clearTimeout(timer)
            // this.refs.scrollView.beginRefresh()
            //this.refs.listView.beginRefresh()
        },500) //自动调用刷新 新增方法
    }


    requestFilmActivityData(){
        console.log('准备请求影片活动数据')

        this.requestData()
    }

    /*----------------------------网络请求数据-----------------------*/

    async requestData(props){//网络请求？
        let response = await fetch('https://wangclub.herokuapp.com/getListViewData')
        let json = await response.json()
        console.log('当前请求结果：',json)
        RNModules.RNOpenOneVC('OK')
        if(json){
            this.setState({
                data:json
            })
        }
    }





    _renderRow(data, sectionID, rowID) {
        let heightStyle = {height: 300, backgroundColor: 'white'}

        return (
            <View style={[styles.row, heightStyle]}>
                <Text>{data}</Text>
            </View>
        );
    }

    viewForRowMotherd(rowData,sectionID,rowID){

        return(
            <View style={{backgroundColor:'white',width:width}}>

                <View style={{flexDirection:'row',marginBottom:0,backgroundColor:'white'}}>
                    <View  style={{backgroundColor:'white',top:10,height:140}}>
                        <Image source={{uri:rowData.split('T0T')[1]}} style={{marginLeft:10,width:90,height:140}}>
                        </Image>
                    </View>

                    <View style={{marginLeft:10,marginBottom:20,width:width-30-90,top:10,backgroundColor:'white'}}>
                        <Text style={{width:width-30-90,top:0,fontSize:15}}>{'马达加斯加企鹅：逃亡非洲'  + this.state.totalPrice}
                        </Text>

                        <View style={{flexDirection:'row',backgroundColor:'red',width:92,height:20,top:10,borderRadius:5}}>
                            <Text style={{marginLeft:2,color:'white',backgroundColor:'rgba(0,0,0,0)',top:2,fontSize:13,height:16,borderRadius:5}}> 票补
                            </Text>
                            <Text style={{marginLeft:0,marginRight:3,color:'red',backgroundColor:'white',top:2,marginBottom:2,fontSize:13,height:16,borderRadius:5,justifyContent:"center"}}> 报名开始
                            </Text>
                        </View>

                        <Text style={{width:width-30-90,height:20,top:20,color:'lightgray',marginBottom:20,fontSize:13}}> 活动时间: 2017-10-31,00:22:00 </Text>
                        <Text style={{width:width-30-90,height:20,top:20,color:'red',fontSize:13}}>{'仅限' + rowData.split('T0T')[0] + rowID + '名'}</Text>

                        <TouchableOpacity  style = {{backgroundColor:'red',top:-10,width:100,marginLeft:width-220,height:35,justifyContent:'center',alignItems:'center',borderRadius:5}}
                                           onPress={()=>{//在这里操作数据
                                               {this.addGood(2)}
                                           }}>

                            <Text style={{color:'white'}}> 立即报名 </Text>
                        </TouchableOpacity>

                        <View style={{marginLeft:width-297,top:-10,flexDirection:'row',width:170,height:20}}>
                            <Text style={{color:'black',backgroundColor:'rgba(0,0,0,0)',top:2,fontSize:13,height:16,borderRadius:5}}> {'剩余' + sectionID + '名'}
                            </Text>
                            <View style={{marginLeft:10,marginRight:3,backgroundColor:'pink',top:4,width:100,height:12,borderRadius:15}}>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:'rgba(249,249,249,1)',width:width - 120,marginLeft:120,height:0.5}}>

                </View>
            </View>
            );
    }


    _renderHeader() {
        return (
            <View >
                <View style={{width: width,height:150}}>
                    <ScrollView
                        ref='scrollView'
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        onMomentumScrollEnd={(e) => {
                            this.onAnimationEnd(e)
                        }}
                    >
                        {this.renderImages()}
                    </ScrollView>


                    <View style={styles.pagingIndicatorStyle}>{this.renderPagingIndicator()}
                    </View>
                </View>

                <View style={{width: width,height:20}}>
                </View>
                <View style={{width: width,backgroundColor: 'white',height:30,marginBottom:20}}>
                    <Text style={{width:width,top:10, height:50,fontSize:18,textAlign: 'center'}}>
                        —— 火速报名中 ——
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        return (
      <View style={styles.container}>

          <ListView  initialListSize = {5}//这个属性用来指定我们第一次渲染时，要读取的行数
                     dataJs={this.state.dataJs}
                     renderHeader={this._renderHeader}
                     ref="listView"
                     dataSource = {this.state.dataSource}
                     renderRow  = {(rowData,sectionID,rowID) => this.viewForRowMotherd(rowData,sectionID,rowID)}
                     style={{backgroundColor:'rgba(249,249,249,1)',marginBottom:20,width:width,height:height-64-150-70}}>
          </ListView>

          <Text style={{width:width,top:0,fontSize:13}}>{'点击报名，等这个数大于4 才可以报名' + ' ￥：' + this.state.totalPrice}
          </Text>
      </View>
    );



  }

renderImages() {
    let allImage = [];
    for (let i = 0; i < imageData.length; i++) {
        let item = imageData[i];
        allImage.push(
                      <Image key={i} source={{uri:item}} style={styles.imageStyle}/>
                      );
    }
    return allImage;
}

    _showLog(i) {
        //显示的内容
        var message = '点击了第: ' + i + '页';
        console.log(message);
    }

onAnimationEnd(e) {
    let offsetX = e.nativeEvent.contentOffset.x;
    let pageIndex = Math.floor(offsetX / width);
    this.setState({currentPage: pageIndex});
}

renderPagingIndicator() {
    let indicatorArr = [];
    let style;
    for (let i = 0; i < imageData.length; i++) {
        style = (i == this.state.currentPage) ? {color: 'orange'} : {color: 'white'};
        indicatorArr.push(
                          <Text key={i} style={[{fontSize: 30}, style]}> • </Text>
                          );
    }
    return indicatorArr;
}
    addGood(plus) {
        console.log('___点击了报名')
        let totalPrice = this.state.totalPrice + parseInt(plus);
        console.log('___totalPrice:',totalPrice)
        this.setState({
                      totalPrice: totalPrice
                      })
        console.log('___this.state.totalPrice:',this.state.totalPrice)
        if(this.state.totalPrice > 0){
            RNModules.RNOpenOneVC('yingbao' + 'OK')
            console.log('___报名x',this.state.DataSource)
            
        }
    }

}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(239,239,239,1)',
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions:{
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    scrollViewStyle:{
        width:width,
        height:200,
        backgroundColor: 'yellow',
    },
    imageStyle: {
        width:width,
        height:200,
    },
    pagingIndicatorStyle:{
        height:25,
        width:width,
        backgroundColor:'rgba(0,0,0,0.4)',
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
    },

    list: {
        marginTop: 64,

    },

    row: {
        height: 50,
        backgroundColor: 'white'
    },
    section: {//每组页眉的样式
        height: 30,
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
        backgroundColor:'purple',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    }
});

AppRegistry.registerComponent('RN2', () => RN2);
