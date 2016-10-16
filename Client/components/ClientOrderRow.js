import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import moment from 'moment';

export default class ClientOrderRow extends Component {
    render() {
        const { order } = this.props;
        const status = this._getHackStatus(order);

        return (
            <TouchableOpacity style={styles.container}>
                <Text>{this.props.index}. ${this._calcTotalPrice(order).toFixed(2)}</Text>
                <Text>{status}</Text>
            </TouchableOpacity>
        );
    }

    _getHackStatus(order){
        if (moment(order.updatedAt).add(30, 'seconds').isBefore(moment())){
            order.status = 'accepted';
        }

        return order.status;
    }


    _calcTotalPrice(order) {
                        return order.items.reduce((prev, cur)=> {
                        return prev + cur.price * cur.quantity;
                    }, 0);
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