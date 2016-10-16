import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, ListView, StyleSheet } from 'react-native';

import ProductList from './ProductList';
import Row from './Row';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 56,
        paddingBottom: 56,
        backgroundColor: '#fff',
    },
    title: {
        padding: 20,
        backgroundColor: '#f1f1f1',
        marginTop: 56,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ddd',
    },
    titleText: {
        color: '#999',
        fontSize: 20,
    }
});


export default class MyScene extends Component {


    render() {
        const props = this.props;
        return (
            <ScrollView style={styles.container}>
                {/*<View style={styles.title}>*/}
                    {/*<Text style={styles.titleText}>{props.title}</Text>*/}
                {/*</View>*/}
                <ProductList navigator={props.navigator}/>
            </ScrollView>

        )
    }
}

