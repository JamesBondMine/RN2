

import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    Platform,
    WebView
} from 'react-native';

export default class RN2 extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex:1,paddingTop:Platform.os==='ios'?20:0,backgroundColor:'red'}}>

                <WebView
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    source={{uri: this.props.url}}
                />
            </View>
        )
    }
}

AppRegistry.registerComponent('RN2', () => RN2);