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
    Dimensions,
    TextInput,
    Keyboard,
    TouchableHighlight,
    NativeModules, Alert
} from 'react-native';


let {
    width,
    height
} = Dimensions.get('window');

var RNModules = NativeModules.RTModule;
export default class RN2 extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '',
            text2: ''};

    }
  render() {
    return (
      <View style={styles.ainer}>


          <TouchableHighlight style = {styles.touchStyle}
                              onPress={
                                  ()=> {
                                      Keyboard.dismiss()
                                  }}>

          <View style = {styles.groundStyle}>


              <Image source={{uri:'http://mpic.tiankong.com/489/0cf/4890cf0adca580bc5989e464204e6e7e/640.jpg@300h'}}
                     style={styles.imageStyle} />


              <View style={styles.userNameStyle}>


                  <TextInput style ={{top:20, height:35,marginLeft:20,marginRight:20}}
                             placeholder="请输入您的账号"
                             onChangeText={(text) => this.setState({text})}
                             //returnKeyType="search"
                             keyboardType='number-pad'
                             //multiline={true}//可以输入多行
                             secureTextEntry={true}
                             clearButtonMode='while-editing'
                             maxLength={11}
                             password={false}
                             onEndEditing={()=>{this.endEdit()}}

                  />

                  <View style={styles.lineStyle}>
                  </View>

                  <TextInput style ={{top:20, height:35,marginLeft:20,marginRight:20}}
                             placeholder="请输入您的密码"
                             onChangeText={(text2) => this.setState({text2})}
                             password={true}
                             clearButtonMode='while-editing'
                             onEndEditing={()=>{this.endEdit()}}

                  />


                  <View style={styles.lineStyle}>

                  </View>


                  <TouchableHighlight style = {styles.buttonStyle}
                                      onPress={

                                          ()=> {
                                              Keyboard.dismiss()
                                              if (this.state.text.length == 0){
                                                   {this.noticeWitnTitle("请输入账号!")}
                                                  Alert.alert("请输入账号!");
                                              }else if (this.state.text2.length == 0){
                                                  // {this.noticeWitnTitle("请输入密码!")}
                                                  Alert.alert("请输入密码!");
                                              }else{
                                                  RNModules.RNOpenOneVC('loginT0T' + this.state.text + 'T0T' + this.state.text + 'T0TOK')
                                              }
                                          }
                                      }>
                      <Text style={{color:'white',fontSize:17}}>
                          登录
                      </Text>
                  </TouchableHighlight>
              </View>

          </View>
      </TouchableHighlight>
      </View>
    );
  }

    endEdit(){

        console.log('点击了以后再说')
    }
    hideModel(){

    }

    //搜索按钮点击
    noticeWitnTitle(message){

    }
    _keyboardDidShow () {
        alert('Keyboard Shown'); 
    }

    _keyboardDidHide () {
        alert('Keyboard Hidden');
    }
    dismiss () {
        dismissKeyboard();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
    userNameStyle: {
        marginLeft:20,
        marginRight:20,
        top:40,
        backgroundColor:'white',
        height:190
    },
    touchStyle:{
        top:0,
        backgroundColor:'red',
        marginLeft:0,
        marginRight:0,
        marginBottom:0,
        height:height,
        margin:0
    },
    imageStyle:{
        marginTop:10 + 44,
        marginRight: 50,
        marginLeft: 50,
        height:100
    },
    buttonStyle:{
        top:40,
        borderRadius:18,
        backgroundColor:'red',
        marginLeft:20,
        marginRight:20,
        marginBottom:1,
        height:36,
        justifyContent:'center',
        alignItems:'center',
        margin:0
    },
    lineStyle:{
        marginBottom:20,
        marginLeft:20,
        marginRight:20,
        top:20,
        backgroundColor:'lightgray',
        height:0.5
    },

    groundStyle:{
        backgroundColor:'white',
        width:width,
        height:height,
        top:0,
        marginLeft:0
    }

});
AppRegistry.registerComponent('RN2', () => RN2);
