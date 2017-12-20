

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    Image
} from 'react-native';

import HomePage from '../JSCustom/HomePage';
import JSRefresh from '../JSCustom/JSRefresh';
import TabNavigator from 'react-native-tab-navigator';

const HOME = 'home';


const HOME_NORMAL = require('../images/tabs/home_normal.png');
const HOME_FOCUS = require('../images/tabs/home_focus.png');


const BANNER = '分类';

const CATEGORY_NORMAL = require('../images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('../images/tabs/category_focus.png');



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



                </TabNavigator>
            </View >
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
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 12.5
    },
    tab: {
        height: 52,
        backgroundColor: '#303030',
        alignItems: 'center',
    }
});
AppRegistry.registerComponent('RN2', () => RN2);