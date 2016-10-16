import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

export default class ProductRow extends Component {
    render() {
        const { imageSrc, id, title, subtitle, price, onAdded, phone } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.leftContent}>
                    <Image source={{ uri: imageSrc }} style={styles.photo} />
                    <View>
                        <Text style={styles.name}>
                            {`${title} ${subtitle}`}
                        </Text>
                        <Text style={styles.helper}>
                            {phone}
                        </Text>
                    </View>
                </View>

                <TouchableHighlight style={styles.button} onPress={()=>onAdded(id,1)}>
                    <Text>${price}</Text>
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
    leftContent: {
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