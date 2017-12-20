import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class RN2 extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(249,249,249,1)',

    }
});

AppRegistry.registerComponent('RN2', () => RN2);
