import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView,ScrollView } from 'react-native';
import ProductRow from './ProductRow';

import ProductsApiClient from '../services/api/productsApiClient'
import OrdersApiClient from '../services/api/ordersApiClient'

export default class Checkout extends Component{
    constructor(){
        super();
        this.state = {order:null, products:null};
    }

    componentDidMount(){
        OrdersApiClient.ensure().then((order)=>{
            this.setState({...this.state, order});

            var productLoadPromises = order.items.map((x)=>{
                return ProductsApiClient.get(x.productId).then((p)=>{
                    return {
                        title: p.title,
                        price: p.price,
                        quantity: x.quantity
                    }
                });
            });

            Promise.all(productLoadPromises).then((results)=>{
               this.setState({...this.state, products: results});
            });
        });
    }

    render(){
        const {order, products} = this.state;

        if (!order || !products) return null;

        return (
            <ScrollView style={styles.container}>
                <View>
                    {this.renderInvoice(products)}
                </View>
                <View>
                    <Text onPress={this.checkout.bind(this)}>Checkout me</Text>
                </View>
            </ScrollView>
        );
    }

    renderInvoice(products){
        function renderItems(){
            return products.map((p,index)=>{
                return <Text key={index}>{p.title} --- {p.quantity} x ${p.price}</Text>
            });
        }

        const totalSum = products.reduce((a,b)=>{
            return a+b.quantity*b.price;
        },0).toFixed(2);

        return (
            <View>
                <View>
                    {renderItems()}
                </View>
                <View>
                    <Text>Summary: ${totalSum}</Text>
                 </View>
            </View>
        );
    }

    checkout(){
        OrdersApiClient.pay(this.state.order.id).then(()=>{
            alert("Your order was accepted")
        })
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 56,
        backgroundColor: '#fff',
    }
});
