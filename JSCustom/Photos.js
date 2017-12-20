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
    constructor(props) {
        super(props);
        this.state = {
            currentPage:0,
            title:null,
            id:null
        };


        const JS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            totalPrice: 0,
            dataSource: JS.cloneWithRows([
                '22T0Thttps://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg',
                '23T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=956735877,215936670&fm=11&gp=0.jpg',
                '24T0Thttps://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3510992391,970315798&fm=200&gp=0.jpg',
                '25T0Thttps://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=227953490,3054069314&fm=27&gp=0.jpg'
            ])
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor:'rgba(249,249,249,1)',width:width,height:10}}></View>
                <ListView  initialListSize = {5}//这个属性用来指定我们第一次渲染时，要读取的行数
                           dataJs={this.state.dataJs}
                           dataSource = {this.state.dataSource}
                           renderRow  = {(rowData) =>

                               <View style={{backgroundColor:'rgba(249,249,249,1)',width:width}}>
                                   <View style={{flexDirection:'row',marginLeft:10,marginRight:10,backgroundColor:'white'}}>

                                       <View  style={{backgroundColor:'white',height:90}}>
                                           <Image source={{uri:rowData.split('T0T')[1]}} style={{width:90,height:90}}>
                                           </Image>
                                       </View>

                                       <View style={{marginLeft:10,marginBottom:20,width:width-30-90,top:10,backgroundColor:'white'}}>
                                           <Text style={{width:width-30-90,top:0,fontSize:15}}>{'《青比山高》 活动照片反馈' }
                                           </Text>
                                           <Text style={{width:width-30-90,height:20,top:20,color:'lightgray',fontSize:13}}> 2017-10-31,00:22:00 </Text>


                                           <TouchableOpacity  style = {{backgroundColor:'red',width:80,marginLeft:width-210,height:27,justifyContent:'center',alignItems:'center',borderRadius:5}}
                                                              onPress={()=>{//在这里操作数据
                                                                  RNModules.RNOpenOneVC('photos' + rowData)
                                                              }}>
                                               <Text style={{color:'white'}}> 点击进入 </Text>
                                           </TouchableOpacity>
                                       </View>

                                   </View>
                                   <View style={{backgroundColor:'rgba(249,249,249,1)',width:width,marginLeft:0,top:10,height:10}}>
                                   </View>

                               </View>
                           }
                           style={{backgroundColor:'rgba(249,249,249,1)',marginBottom:20,width:width,height:height-64-150-70}}>
                </ListView>
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
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(249,249,249,1)',

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
    }
});

AppRegistry.registerComponent('RN2', () => RN2);