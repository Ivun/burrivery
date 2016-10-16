import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Row extends Component {
    _navigate(title){
        this.props.navigator.push({
            title: title,
            index: 2,
        })
    }

    render() {
        const props = this.props;
        if (typeof props.price === 'undefined') {
            return (
                <TouchableOpacity style={styles.container} onPress={ () => this._navigate(props.title) }>
                    <View style={styles.leftConent}>
                        <Image source={{ uri: props.picture.thumbnail}} style={styles.photo} />
                        <View>
                            <Text style={styles.name}>
                                {`${props.title}`}
                            </Text>
                            <Text style={styles.helper}>
                                {`${props.subtitle}`}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={ () => this._navigate() } >
                    <View style={styles.leftConent}>
                        <Image source={{ uri: props.picture.thumbnail}} style={styles.photo} />
                        <View>
                            <Text style={styles.name}>
                                {`${props.title}`}
                            </Text>
                            <Text style={styles.helper}>
                                {`${props.subtitle}`}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.button}>
                        <Text>{`${props.price}`}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftConent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    name: {
        marginBottom: 0,
        fontSize: 16,
    },
    helper: {
        fontSize: 12,
        color: '#999',
    },
    photo: {
        height: 40,
        width: 40,
        marginRight: 12,
    },
    button: {
        backgroundColor: '#eee',
        padding: 10,
    }
});