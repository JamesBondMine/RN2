

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    TouchableOpacity
} from 'react-native';

import Third from './Third';
export default class RN2 extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }


    _pressButton(){
        const { navigator } = this.props;
        if(navigator){
            navigator.pop();
        }
    }

    render() {
        return (
            <View  style={{backgroundColor:'white'}}>
                <TouchableOpacity onPress={this._pressButton.bind(this)}>

                    <View style={{backgroundColor:'red',width:200,height:200,marginLeft:20,marginTop:100}}>
                        <Text>点我跳转回去</Text>
                    </View>

                </TouchableOpacity>
            </View>

        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    },
});
AppRegistry.registerComponent('RN2', () => RN2);