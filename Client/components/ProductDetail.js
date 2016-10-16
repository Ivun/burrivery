import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView } from 'react-native';
import ProductRow from './ProductRow';

import ProductsApiClient from '../services/api/productsApiClient'
import OrdersApiClient from '../services/api/ordersApiClient'

export class ProductDetail extends Component{
    constructor(){
        super();
        this.state = {product:null,quantity:1,order:null};
    }

    componentDidMount(){
        ProductsApiClient.get(this.props.productId).then((product)=>{
            this.setState({...state, product});
        });

        OrdersApiClient.ensure().then((order)=>{
            this.setState({...state, order});
        });
    }

    render(){
        const {  product, order} = this.state;

        if (!product) return "";

        return (
            <ScrollView>
                <Text>{this.state.product.title}</Text>
            </ScrollView>
        );
    }
}

