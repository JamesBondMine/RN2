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
    TouchableOpacity,
    NativeModules
} from 'react-native';


var RNModules = NativeModules.RTModule;
export default class RN2 extends Component {

  render() {
    return (
            <View style={styles.container}>
            
            <TouchableOpacity
            onPress={()=>RNModules.RNOpenOneVC('测试')}>
            <Text  style={{backgroundColor: 'red', width: 200, height: 130}}>第一行!</Text>
            
            <Text  style={{backgroundColor: 'red', width: 200, height: 130}}>第二行</Text>
            
            
            <Text  style={{backgroundColor: 'red', width: 200, height: 130}}>第三行</Text>
            
            </TouchableOpacity>
            </View>
            );
  }
}

const styles = StyleSheet.create({
                                 container: {
                                 backgroundColor : '#fefefe',
                                 height:100,
                                 flexDirection : 'row'
                                 },
                                 });

AppRegistry.registerComponent('RN2', () => RN2);
