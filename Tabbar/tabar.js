
'use strict'
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    Image,
    TouchableOpacity
} from 'react-native';


const HOME_NORMAL=require('../images/tabs/cart_focus.png');
const HOME_FOCUS =require('../images/tabs/cart_normal.png');
const CATEGORY_NORMAL=require('../images/tabs/category_focus.png');
const CATEGORY_FOCUS=require('../images/tabs/category_normal.png');


import First from './First';
import Second from './Second';
import Third from './Third';
import Four from './Four';

import TabNavigator from 'react-native-tab-navigator'

 export default class RN2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        }
    }




     _renderPage(route, nav) {
        switch (route.id) {
            case 'main':
                return (<First navigator={nav} nav={nav}/>);
                break;
            case 'webview':
                return (<Second navigator={nav} url={route.url}/>);
                break;
            case 'Third':
                return (<Third navigator={nav} title="Detail"  url={route.url}/>);
                break;
            case 'Four':
                return (<Four navigator={nav} url={route.url}/>);
                break;
        }
    }



    NavigationBarRouteMapper = {
     //左边Button
        LeftButton: function(route, navigator, index, navState) {
            console.log('route.id______________________________________!!_:',route.id)
            var previousRoute = navState.routeStack[index - 1];
            return (
                <TouchableOpacity
                    onPress={() =>
                        navigator.pop()
                    }
                    style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        {'返回'}
                    </Text>
                </TouchableOpacity>
            );
        },
        //右边Button
        RightButton: function(route, navigator, index, navState) {

            return null;

            if (route.id === '详情') {
                return null;
            }
            return (
                <TouchableOpacity
                    onPress={() => navigator.push({id:'详情',title:'详情'})}
                    style={styles.navBarRightButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        下一步
                    </Text>
                </TouchableOpacity>
            );
        },
        //标题
        Title: function(route, navigator, index, navState) {
            return (
                <Text style={[styles.navBarText, styles.navBarTitleText]}>
                    {route.title}
                </Text>
            );
        },
    };

    render() {
        return (
            <Navigator
                initialRoute={{name: 'main', index: 0, id:'main'}}
                renderScene={(route, navigator) => this._renderPage(route,navigator)}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
                navigationBar = {
                    <Navigator.NavigationBar
                        routeMapper={this.NavigationBarRouteMapper}
                        style={styles.navBar}

                    />
                }
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
    },
    navBar: {
        backgroundColor: 'red',
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 10,
        color:'white',
    },
    navBarTitleText: {
        color:'white',
        fontWeight: '500',
        marginVertical: 9,
    },

    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        color:'white',
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    },
});
AppRegistry.registerComponent('RN2', () => RN2);