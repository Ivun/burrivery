import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const styles = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
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

export default class BottomNavItem extends Component {
    render() {
        const props = this.props;
        if (Number(props.count) === props.count && props.count % 1 === 0) {
            return (

                <TouchableOpacity onPress={props.onPress}>
                    <View style={styles.item}>
                        <Image source={props.icon} style={styles.icon} />
                        <Text style={styles.text}>{props.title}</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>1</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={props.onPress}>
                    <View style={styles.item}>
                        <Image source={props.icon} style={styles.icon} />
                        <Text style={styles.text}>{props.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }
}