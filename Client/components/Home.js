import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 56,
        backgroundColor: '#fff',
    }
});


export default class Home extends Component {
    navSecond(){
        this.props.navigator.push({title: 'Senior Burrito', index: 1})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello</Text>
                <TouchableHighlight onPress={this.navSecond.bind(this)}>
                    <Text>Navigate to second screen</Text>
                </TouchableHighlight>
            </View>

        )
    }
}

