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
    TouchableWithoutFeedback,
    PropTypes,
    Navigator,
    ScrollView,
    NativeModules,
    TextInput,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';


import Dimensions from 'Dimensions'
import SimpleQuestionCell from './SimpleQuestionCell'
import ConcernCell from './ConcernCell'

let {
    width,
    height
} = Dimensions.get('window');

String.prototype.trim = function(){
  return this.replace(/^[\s,，]+/, "").replace(/[\s,，]+$/, "");
}

var RNModules = NativeModules.RTModule;

export default class RN2 extends Component {
  constructor(props){
    super(props)

    this.state = {
      text:"",
      loadMore:false,
      brand:props.brand,
      userData:{},
      ds:new ListView.DataSource(
          {
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          }
      )
    }
  }
    /*----------------------------子类向父类传值测试-----------------------*/
    _onPressButton(str){
         console.log('happy',str)
    }


  componentDidMount(){
    this._fetchData()
  }




    /*----------------------------网络请求数据-----------------------*/

  async _fetchData(props){//网络请求？
      console.log('当前请求链接：https://wangclub.herokuapp.com/getListViewData')
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


    /*----------------------------cell 分组创建-----------------------*/
  _renderRow(rowData,sectionID,rowId){

      /*----------------------------服务分组-----------------------*/
      if(sectionID === 'service'){
          return (
              <View style = {{backgroundColor:'white'}}>
                  <TouchableOpacity
                      onPress={()=>{//在这里操作数据
                          var str1222 = "Third";
                          RNModules.RNOpenOneVC(str1222)
                      }}>

                      <View style={{flexDirection:'row',marginTop:15,marginBottom:15,alignItems:'center',backgroundColor:'white'}}>

                          <Image style={{marginLeft:15,width:90,height:160,alignSelf:'center'}} source={{uri:rowData.product_image}}>
                          </Image>

                          <View style={{marginLeft:10,width:width - 125,backgroundColor:'white'}}>
                              <Text style={{marginTop:5,fontSize:16,color:'#333333'}}>{rowData.name}
                              </Text>
                              <Text style={{marginTop:6,fontSize:13,color:'#999999'}}>{rowData.description}
                              </Text>
                              <Text style={{marginTop:6,fontSize:13,color:'#999999'}}>{rowData.keyword}//关键词
                              </Text>


                              <Text style={{marginTop:6,fontSize:13,color:'#ff4b0c'}}>{'￥' + rowData.price}
                                  <Text style={{fontSize:10,color:'#999999',textDecorationLine:'line-through'}}>{'￥' + rowData.market_price}
                                  </Text>
                              </Text>
                          </View>
                      </View>
                      {this._renderFooter(sectionID,rowId)}
                  </TouchableOpacity>

              </View>
          )
      }





      /*----------------------------技师分组-----------------------*/
      if (sectionID === 'brandme'){//
          return(
              <View  callback={this._onPressButton.bind(this)}>
                  <ConcernCell rowData={rowData} rowid={rowId} isSubmit={true} js = 'Good'/>
                  {this._renderFooter(sectionID,rowId)}
              </View>
          )
      }





      /*----------------------------问题分组-----------------------*/
    if (sectionID === 'question'){
      if(rowData === 'ask'){
          return(
              <View>
                  <TouchableOpacity
                      onPress={()=>{//在这里操作数据
                          RNModules.RNOpenOneVC('ThirdRefresh')
                      }}>

                  <View style={{backgroundColor:'white',padding:15,width:width}}>
                      <View style={{backgroundColor:'#ff4b0c',borderRadius:4,flexDirection:'row',height:42,alignItems:'center',justifyContent:'center'}}>
                          <Image source={require('./styles/assets/lijitiwen.png')} style={{width:16,height:16}}/>
                          <Text style={{marginLeft:4,color:'white',fontSize:15}}>立即提问
                          </Text>
                      </View>
                  </View>
                  <View style={{height:5,backgroundColor:"#f2f2f2",width:width}}/>

                  </TouchableOpacity>

              </View>
          )
      }else{
          return (
              <View>

                  <TouchableOpacity
                      onPress={()=>{//在这里操作数据
                          RNModules.RNOpenOneVC('ThirdMainScreen')
                      }}>

                  <SimpleQuestionCell rowData={rowData} />
                  {this._renderFooter(sectionID,rowId)}
                  </TouchableOpacity>

              </View>
          )
      }
    }






      /*----------------------------资讯分组-----------------------*/
    if(sectionID === 'article'){
      return (
          <View>
              <TouchableOpacity
                  onPress={()=>{//在这里操作数据
                      RNModules.RNOpenOneVC('ThirdBanner')
                  }}>

              <View style={{flexDirection:'row',marginTop:15,marginBottom:15,backgroundColor:'white'}}>

                  <Image style={{marginLeft:15,width:100,height:125,alignSelf:'center'}}
                         source={{uri:rowData.pic}}>
                  </Image>
                  <View style={{marginLeft:10,width:width/2 + 25}}>
                      <Text style={{marginTop:5,marginBottom:15,fontSize:20,color:'#333333'}}> 问题！！！
                      </Text>
                      <Text style={{marginTop:5,height:60,marginBottom:15,fontSize:14,color:'#333333'}}>
                          {rowData.title}
                      </Text>
                      <Text style={{marginBottom:15,fontSize:10,color:'#999999'}}>
                              {rowData.publish_at_friendly}
                      </Text>
                      <Image source={require('./styles/assets/ribaopinlun.png')}
                             style={{position:'absolute',top:123,width:20,height:20,right:42}}>
                      </Image>
                      <Text style={{position:'absolute',top:127,fontSize:10,color:'#999999',right:1}} >
                          {'评论数 ' + rowData.comment_count}
                      </Text>
                  </View>
              </View>
              {this._renderFooter(sectionID,rowId)}
              </TouchableOpacity>

          </View>
      )
    }



      return <View/>
  }



    /*----------------------------页眉的样式----------------------*/

  _renderHeader(sectionData,sectionId){//页眉的样式
    if(sectionData && sectionId){
      if(sectionId === 'question'){
        if(sectionData[0] === 'ask'){
          return false
        }
      }
      return (
            <View>
              <View style={{height:35,flexDirection:'row',width:width,backgroundColor:'white',alignItems:'center'}}>
                <Image style={{width:20,height:20,marginLeft:12}} source={this._getHeaderImg(sectionId)}/>
                <Text style={{flex:1,marginLeft:4,fontSize:13,fontWeight:'bold',color:'#333333'}}>{this._checkHeadText(sectionId)}</Text>
                <Text style={{flex:1,marginRight:4,fontSize:12,textAlign:'right',color:'#999999'}}>更多</Text>
                <Image style={{width:8,height:12,marginRight:12}} source={require('./styles/assets/icon_right@3x.png')}/>
              </View>
              {this._headerLine(sectionId)}
            </View>
      )
    }else{
      return false
    }
  }

    /*----------------------------页眉的底线----------------------*/
    _headerLine(sectionId){
        return(

            <View style={{marginTop:0,width:width,height:10.5,backgroundColor:'rgba(249,249,249,1)'}}/>
        )
    }


    /*----------------------------页脚-----------------------*/
  _renderFooter(sectionID,rowID){


      if(sectionID === 'service'){
          return (
              <View style={{width:width,height:22.5,backgroundColor:'rgba(249,249,249,1)'}}>
                  <Text style={{flex:1,marginRight:4,fontSize:12,textAlign:'center',color:'#999999'}}>11111111</Text>
              </View>
          )
      }
      if(sectionID === 'brandme'){
          return (
              <View style={{width:width,height:22.5,backgroundColor:'rgba(249,249,249,1)'}}>
                  <Text style={{flex:1,marginRight:4,fontSize:12,textAlign:'center',color:'#999999'}}>222222222222</Text>
              </View>
          )
      }
      if(sectionID === 'question'){
          return (
              <View style={{width:width,height:22.5,backgroundColor:'rgba(249,249,249,1)'}}>
                  <Text style={{flex:1,marginRight:4,fontSize:12,textAlign:'center',color:'#999999'}}>333333333333333</Text>
              </View>
          )
      }
      if(sectionID === 'article'){
          if(rowID === '0'){
              return (
                  <View style={{height:25,backgroundColor:'rgba(249,249,249,1)',width:width}}>
                      <Text style={{flex:1,marginRight:4,fontSize:12,textAlign:'center',color:'#999999'}}>4444444444</Text>
                  </View>
              )
          }else{
              return (
                  <View style={{width:width,height:22.5,backgroundColor:'rgba(249,249,249,1)'}}>
                      <Text style={{flex:1,marginRight:4,fontSize:12,textAlign:'center',color:'#999999'}}>42424242424242424242</Text>
                  </View>
              )
          }
      }
  }

    /*----------------------------ListView-----------------------*/
    _renderList() {
        if (this.state.data) {
            return(
                <ListView
                    dataSource={this.state.ds.cloneWithRowsAndSections(this.state.data.lists)}
                    renderRow={(rowData,sectionID,rowId) => this._renderRow(rowData,sectionID,rowId)}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={(sectionData,sectionId) => this._renderHeader(sectionData,sectionId)}
                >
                </ListView>
            )
        } else {
            return false
        }
    }


    /*----------------------------页眉的标题-----------------------*/
    _checkHeadText(sectionId){//
        if (sectionId === 'service'){
            return '服务'
        }else if(sectionId === 'brandme'){
            return '技师'
        }else if (sectionId === 'question'){
            return '问题'
        }else if(sectionId === 'article'){
            return '资讯'
        }
    }

    /*----------------------------页眉的图标----------------------*/
    _getHeaderImg(sectionId){//
        if (sectionId === 'service'){
            return require('./styles/assets/fuwu.png')
        }else if(sectionId === 'brandme'){
            return require('./styles/assets/jishi.png')
        }else if (sectionId === 'question'){
            return require('./styles/assets/wenti.png')
        }else if(sectionId === 'article'){
            return require('./styles/assets/article.png')
        }
    }

    /**
     * 模拟刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this._page=0
            let data = []
            for (let i = 0;i<10;i++){
                data.push(i)
            }
            this.setState({
                dataSource:this._dataSource.cloneWithRows(data)
            })
            this.refs.listView.resetStatus() //重置上拉加载的状态
            end()//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //新增方法 结束刷新 建议使用end() 。当然这个可以在任何地方使用
        },1500)
    }




    /**
     * 模拟加载更多
     * @param end
     * @private
     */
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this._page++
            let data = []
            for (let i = 0;i<(this._page+1)*10;i++){
                data.push(i)
            }
            this.setState({
                dataSource:this._dataSource.cloneWithRows(data)
            })
            end(this._page > 2)//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕

        },2000)
    }






    /*----------------------------主方法-----------------------*/
    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>

                {this._renderList()}
            </View>
        )
    }
}


/*----------------------------样式-----------------------*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
