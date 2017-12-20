/**
 * Created by yuanguozheng on 16/1/19.
 */
'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    Navigator
} from 'react-native';



import HomePage from './HomePage';
import JSRefresh from './JSRefresh';
import Photos from './Photos';
import TabNavigator from 'react-native-tab-navigator';
import CustomView from './CustomView'


const HOME = 'home';
const HOME_NORMAL = require('../images/tabs/home_normal.png');
const HOME_FOCUS = require('../images/tabs/home_focus.png');


const BANNER = '分类';
const CATEGORY_NORMAL = require('../images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('../images/tabs/category_focus.png');


const FAXIAN = '发现';
const FAXIAN_NORMAL = require('../images/tabs/faxian_normal.png');
const FAXIAN_FOCUS = require('../images/tabs/faxian_focus.png');


const CART = '购物车';
const CART_NORMAL = require('../images/tabs/cart_normal.png');
const CART_FOCUS = require('../images/tabs/cart_focus.png');


const PERSONAL = '我的';
const PERSONAL_NORMAL = require('../images/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('../images/tabs/personal_focus.png');

export default class RN2 extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedTab: HOME}
    }

    _renderTabItem(img, selectedImg, tag, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    _createChildView(tag) {
        return (
            <View style={{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>{tag}</Text>

                <CustomView rowData='you are  my baby girl !' rowid='I love  you so  much do you  know'  js = 'what is  my  favorite food ?'/>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage nav={this.props.nav}/>)}

                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, BANNER, <JSRefresh nav={this.props.nav}/>)}
                    {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN,  <Photos nav={this.props.nav}/>)}
                    {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, this._createChildView(CART))}
                    {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, this._createChildView(PERSONAL))}


                </TabNavigator>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        height: 52,
        backgroundColor: '#303030',
        alignItems: 'center',
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    }
});
AppRegistry.registerComponent('RN2', () => RN2);