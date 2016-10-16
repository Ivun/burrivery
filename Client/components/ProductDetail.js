import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView,ScrollView } from 'react-native';
import ProductRow from './ProductRow';

import ProductsApiClient from '../services/api/productsApiClient'
import OrdersApiClient from '../services/api/ordersApiClient'

export default class ProductDetail extends Component{
    constructor(){
        super();
        this.state = {product:null, quantity:1, order : null};
    }

    componentDidMount(){
        const productLoadPromise = ProductsApiClient.get(this.props.productId);
        const orderLoadPromise = OrdersApiClient.ensure();

        Promise.all([productLoadPromise, orderLoadPromise]).then((results)=>{
            const product = results[0];
            const order = results[1];

            this.setState({...this.state, product});
            this._setOrder(order);
        }).catch(()=>{});
    }

    render(){
        const {  product, order} = this.state;

        if (!product) return null;

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text>{this.state.product.title} - ${this.state.product.price}</Text>
                    <Text>{this.state.product.subtitle}</Text>
                    <Text onPress={this._quantityDecr.bind(this)}>-</Text>
                    <Text>{this.state.quantity}</Text>
                    <Text onPress={this._quantityIncr.bind(this)}>+</Text>
                    <Text onPress={this._update.bind(this)}>{this.renderCartButton()}</Text>
                </View>

            </ScrollView>
        );
    }

    renderCartButton(){
            if(this._getCurrentOrderQuantity() == this.state.quantity){
                return null;
            }

            if (this._getCurrentOrderQuantity() < this.state.quantity){
                return <Text>Add additional {this.state.quantity - this._getCurrentOrderQuantity()} to the cart</Text>
            }else{
                if (this.state.quantity == 0){
                    return <Text>Remove from the cart</Text>
                }else{
                    return <Text>Remove {this._getCurrentOrderQuantity()-this.state.quantity} from the cart</Text>
                }
            }
    }

    _update(){
        const currentOrderQuantity = this._getCurrentOrderQuantity();
        return this._updateQuantity(this.state.quantity - currentOrderQuantity).then(()=>{
            this.props.navigator.pop();
        }).catch(()=>{});
    }

    _getCurrentOrderQuantity(){
        const currentOrderItem = this._getOrderItem(this.state.order, this.props.productId);
        return currentOrderItem ? currentOrderItem.quantity : 0;
    }


    _updateQuantity(quantityChange){
        if(quantityChange >= 0){
            return OrdersApiClient.add(this.state.order.id, this.props.productId, quantityChange);
        }else{
            return OrdersApiClient.remove(this.state.order.id, this.props.productId, -quantityChange);
        }
    }

    _setOrder(order){
        var newState = {...this.state};
        newState = {...newState, order};

        var currentOrderItem = this._getOrderItem(order, this.props.productId);

        if (currentOrderItem){
            newState = {...newState, quantity: currentOrderItem.quantity};
        }

        this.setState(newState);
    }

    _getOrderItem(order, productId){
        if (!order) return null;
        return order.items.find(x=>x.productId == productId);
    }

    _quantityIncr(){
        this.setState({...this.state, quantity: this.state.quantity + 1});
    }

    _quantityDecr(){
        this.setState({...this.state, quantity: Math.max(0, this.state.quantity - 1)});
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 56,
        backgroundColor: '#fff',
    }
});
