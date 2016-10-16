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

        return (
            <TouchableOpacity style={styles.container} onPress={ () => this._navigate(props.title) } >
                <View style={styles.leftConent}>
                    { typeof props.picture !== 'undefined' ?
                        <Image source={{ uri: props.picture.thumbnail}} style={styles.photo} /> : null
                    }
                    <View>
                        <Text style={styles.name}>
                            {`${props.title}`}
                        </Text>
                        { typeof props.subtitle !== 'undefined' ?
                            <Text style={styles.helper}>
                                {`${props.subtitle}`}
                            </Text> : null
                        }

                    </View>
                </View>
                { typeof props.price !== 'undefined' ?
                    <View style={styles.button}>
                        <Text>{`${props.price}`}</Text>
                    </View> : null
                }

            </TouchableOpacity>
        );

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