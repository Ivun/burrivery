import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView } from 'react-native';
import ProductRow from './ProductRow';

import ProductsApiClient from '../services/api/productsApiClient'
import OrdersApiClient from '../services/api/ordersApiClient'

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {
            dataSource: this.ds.cloneWithRows([])
        };
    }

    componentDidMount(){
        this._loadProducts();
    }

    render() {
        const props = this.props;
        return (
                <ListView
                    enableEmptySections={true}
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => <ProductRow {...data} navigator={props.navigator}/>}
                />
        )
    }

    _addToCart(id, quantity){
        OrdersApiClient.ensure().then((order)=>{
            return OrdersApiClient.add(order.id, id, quantity);
        }).catch(()=>{});
    }

    _loadProducts(){
        ProductsApiClient.list().then(items=>{
            this.setState({dataSource: this.ds.cloneWithRows(items)});
        }).catch(()=>{});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 56,
        backgroundColor: '#fff'
    }
});