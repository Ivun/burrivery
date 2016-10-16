import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import FCM from 'react-native-fcm';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 56,
        backgroundColor: '#fff',
    }
});


export default class Home extends Component {
    constructor(){
        super();
        this.state = {};
    }
    navSecond(){
        this.props.navigator.push({title: 'Senior Burrito', index: 1})
    }

    componentDidMount(){
        FCM.getFCMToken().then(token => {
            this.setState({...this.state, token});
            alert(token);
            // store fcm token in your server
        }).catch((err)=>{
            alert(err);
            this.setState({...this.state, err:err});});

        FCM.on('refreshToken', (token) => {
            alert(token)
            // fcm token may not be available on first load, catch it here
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello2</Text>
                <Text>{this.state.token || ""}</Text>
                <Text>{this.state.err || ""}</Text>
                <TouchableHighlight onPress={this.navSecond.bind(this)}>
                    <Text>Navigate to second screen</Text>
                </TouchableHighlight>
            </View>

        )
    }
}

