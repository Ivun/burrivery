import React, {Component} from 'react';
import {AppRegistry, NavigatorIOS, Text, View} from 'react-native';

import MyScene from './components/TestScene';

export default class Client extends Component {
    render() {
        return (
            <MyScene />
        )
    }
}


AppRegistry.registerComponent('Client', () => Client);
