import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const styles = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 12,
    },
    label: {
        backgroundColor: 'red',
        position: 'absolute',
        right: 3,
        top: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    labelText: {
        color: '#fff',
        textAlign: 'center',
        lineHeight: 12,
        fontSize: 9,
    }
});

export default class IconThumb extends Component {
    render() {
        const props = this.props;
        return (
            <TouchableOpacity onPress={props.onPress}>
                <View style={styles.item}>
                    <Image source={props.icon} style={props.iconSize} />
                    <Text style={styles.text}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        )

    }
}