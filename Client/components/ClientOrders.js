import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView,ScrollView } from 'react-native';
import ProductRow from './ProductRow';
import ClientOrderRow from './ClientOrderRow'

import ProductsApiClient from '../services/api/productsApiClient'
import OrdersApiClient from '../services/api/ordersApiClient'

export default class ClientOrders extends Component{
    constructor(){
        super();
        this.state = {activeOrders:null};
    }

    componentDidMount(){
        this.interval = setInterval(()=>{
            this._reloadOrders();
        },1000);

        this._reloadOrders();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        const {activeOrders} = this.state;

        if (!activeOrders) return null;


        function renderOrderList(){
            return activeOrders.map((o, i)=>{
                return <ClientOrderRow order={o} key={o.id} index={++i}/>
            })
        }

        return (
            <ScrollView style={styles.container}>
                <View>
                    {renderOrderList()}
                </View>
            </ScrollView>
        );
    }

    _reloadOrders(){
        OrdersApiClient.active().then((orders)=>{
            this.setState({...this.state, activeOrders:orders});
        });
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 56,
        backgroundColor: '#fff',
    }
});
