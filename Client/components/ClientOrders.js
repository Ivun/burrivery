import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView,ScrollView } from 'react-native';
import ProductRow from './ProductRow';

import ProductsApiClient from '../services/api/productsApiClient'
import OrdersApiClient from '../services/api/ordersApiClient'

export default class ClientOrders extends Component{
    constructor(){
        super();
        this.state = {activeOrders:null};
    }

    componentDidMount(){
        OrdersApiClient.active().then((orders)=>{
            this.setState({...this.state, activeOrders:orders});
        });
    }

    render() {
        const {activeOrders} = this.state;

        if (!activeOrders) return null;

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text>{JSON.stringify(activeOrders)}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 56,
        backgroundColor: '#fff',
    }
});
