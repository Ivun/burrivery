import React, { Component, PropTypes } from 'react';
import { View, Image, ScrollView, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import FCM from 'react-native-fcm';

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
            console.log(token);
            // store fcm token in your server
        }).catch((err)=>{
            console.log(err);
            this.setState({...this.state, err:err});});

        FCM.on('refreshToken', (token) => {
            console.log(token)
            // fcm token may not be available on first load, catch it here
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello2</Text>
                {/*<View style={styles.wannaEat}>*/}
                    {/*<TouchableHighlight>*/}
                        {/*<Image source={props.icon} style={styles.wannaEatImage} />*/}
                    {/*</TouchableHighlight>*/}
                {/*</View>*/}
                <View>
                    <ScrollView horizontal={true} >
                        <Text>1</Text>
                        <Text>1</Text>
                        <Text>1</Text>
                        <Text>1</Text>
                    </ScrollView>
                </View>
                <TouchableHighlight onPress={this.navSecond.bind(this)}>
                    <Text>Navigate to second screen</Text>
                </TouchableHighlight>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 56,
        backgroundColor: '#fff',
    },
    wannaEat: {
        height: 200,
        backgroundColor: '#eee',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wannaEatImage: {
        width: 100,
        height: 100,
    },
});

