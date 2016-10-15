import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

export default class Row extends Component {
    _onPressButton() {
        alert("You tapped the button!");
    }

    render() {
        const props = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.leftConent}>
                    <Image source={{ uri: props.picture.large}} style={styles.photo} />
                    <View>
                        <Text style={styles.name}>
                            {`${props.name.first} ${props.name.last}`}
                        </Text>
                        <Text style={styles.helper}>
                            {`${props.location.city.replace(/\b\w/g, l => l.toUpperCase()) }, ${props.phone}`}
                        </Text>
                    </View>
                </View>

                <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
                    <Text>Button</Text>
                </TouchableHighlight>
            </View>
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