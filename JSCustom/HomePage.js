/**
 * Created by yuanguozheng on 16/1/22.
 */
'use strict';
import React, { Component } from 'react';

import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    ListView,
    RefreshControl,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback,
    Navigator
} from 'react-native';

import JSPhotos  from './Photos';
import ViewPager from 'react-native-viewpager';
import CustomWebView from './CustomWebView'

const BANNER_IMGS = [
    require('../images/banner/1.jpg'),
    require('../images/banner/2.jpg'),
    require('../images/banner/3.jpg'),
    require('../images/banner/4.jpg')
];

const len = 160;

export default class RN2 extends Component {

    constructor(props) {
        super(props);


        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this._onMenuClick = this._onMenuClick.bind(this);
        this._onRecommendClick = this._onRecommendClick.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            listData: ds
        }
    }

    componentWillMount() {

        fetch('http://m.jd.com/index/recommend.action?_format_=json&page=1')
            .then((res)=> res.json())
            .then((str)=> {
                let arr = JSON.parse(str.recommend).wareInfoList;
                var rows = [];
                for (let i = 0; i < arr.length; i += 2) {
                    console.log('____________________________!!_:',item)//15686740097
                    var item = {id: i, left: null, right: null};
                    item.left = (arr[i]);
                    if (i < arr.length - 1) {
                        item.right = (arr[i + 1]);
                    }
                    rows.push(item);
                }
                var ds = this.state.listData.cloneWithRows(rows);
                this.setState({listData: ds});
            });

    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }

    _onMenuClick(title, tag) {
        Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);

    }





    /*-------------------点击了其中一个图片---------------------*/
    _onRecommendClick(wareId) {
        let url = 'http://item.m.jd.com/product/' + wareId + '.html';

        console.log('点击了其中一个图片',wareId)//15686740097


        this.props.nav.push({
            id: 'webview',
            title: '详情',
            url: url

        });
    }

    hideNavBar(){
    this.setState({hideNavBar: true});

    }



    customWebViewMotherd(wareId){

        let url = 'http://item.m.jd.com/product/' + wareId + '.html';


        this.hideNavBar()

        this.props.nav.push({
            id: 'Third',
            title: 'Thrd',
            url: url

        });
    }

    _renderRow(rowData) {
        return (
            <View style={{flexDirection:'row'}}>





                {/*-------------------左侧---------------------*/}

                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>
                                          {this._onRecommendClick(rowData.left.wareId)}
                                          }>

                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={{uri:rowData.left.imageurl}}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.left.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View
                            style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>￥{rowData.left.jdPrice}</Text>
                            <TouchableWithoutFeedback>

                                <View style = {styles.jsStyle}>
                                    <Text style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>

                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>


                {/*-------------------右侧---------------------*/}
                {
                    <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                              onPress={()=>
                                              {this.customWebViewMotherd(rowData.right.wareId)}
                                              }>

                        <View style={{flex:1,alignItems:'center'}}>
                            <Image resizeMode={'stretch'} source={{uri:rowData.right ? rowData.right.imageurl : 'no'}}
                                   style={{width:len,height:len}}/>

                            <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.right ? rowData.right.wname : ''}</Text>

                            <View style ={{width:rowData.right ? len : 0,borderWidth:0.5,borderColor:'#d7d7d7'}}/>

                            <View
                                style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>

                                <Text style={styles.priceText}>{rowData.right ? '￥' + rowData.right.jdPrice : ''}</Text>
                                <TouchableWithoutFeedback>
                                    <View sstyle = {styles.jsStyle}>
                                        <Text style={{color:'#999999',fontSize:12,textAlign:'center'}}>{rowData.right ? '看相似': ''}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                }


            </View>
        );
    }

    /*-------------------主方法--------------------*/

    render() {
        return (
            <ListView
                style={{flex:1,backgroundColor:'white'}}
                dataSource={this.state.listData}
                renderRow={this._renderRow}

                renderHeader={()=>{return(

                    <View>
                    <ViewPager
                        style={{height:130}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}>
                    </ViewPager>

                        <View style={{marginTop:15,borderWidth:0.5,borderColor:'red'}}/>
                        <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>猜你喜欢</Text>

                    </View>
                ) } }
            >

            </ListView>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: 130,
        resizeMode: 'stretch'
    },
    navBar: {
        backgroundColor: 'green',
    },
    menuView: {
        flexDirection: 'row',
        marginTop: 10
    },
    recommendTitle: {
        width: len,
        flexWrap: 'wrap',
        fontSize: 12,
        color: 'black',
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        height: 30
    },
    priceText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 13,
        color: '#f15353'
    },
    jsStyle: {
        width:50,
        height:18,
        borderWidth:1,
        borderColor:'#999999',
        borderRadius:3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
AppRegistry.registerComponent('RN2', () => RN2);
