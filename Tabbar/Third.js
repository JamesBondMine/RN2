

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Platform,
    WebView,
    TouchableOpacity
} from 'react-native';

import Four from './Four';

// export default class RN2 extends Component {

export default class Third extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }


    pressButtoon(){
        const { navigator} = this.props;
        navigator.push({
            id: 'Four',
            title:'Four',
            component:Four,
        })
    }
    render() {

        var defaultName = 'Four';
        var defaultComponent = Four;
        return (
            <View style={{backgroundColor:'white'}}>
                <TouchableOpacity onPress={this.pressButtoon.bind(this)}>

                    <View style={{backgroundColor:'black',width:200,height:200,marginLeft:20,marginTop:100}}>
                        <Text style={{color:'white'}}>点我跳转</Text>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    },
});
AppRegistry.registerComponent('RN2', () => RN2);