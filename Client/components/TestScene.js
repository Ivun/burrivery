import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, ListView, StyleSheet } from 'react-native';

import ProductList from './ProductList';
import Row from './Row';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data)
        };
    }

    render() {
        const props = this.props;
        return (
            <ScrollView>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
                <ProductList/>
            </ScrollView>

        )
    }
}

