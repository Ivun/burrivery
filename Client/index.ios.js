import React, {Component} from 'react';
import {AppRegistry, NavigatorIOS, Text, View} from 'react-native';

import MyScene from './components/TestScene';

export default class Burrivery extends Component {
    render() {
        return (
            <MyScene />
        )
    }
}


AppRegistry.registerComponent('Burrivery', () => Burrivery);
