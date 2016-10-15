import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, ListView, StyleSheet } from 'react-native';

import Row from './Row';
import BottomNavItem from './BottomNavItem';

import data from './Data';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 56,
        backgroundColor: '#fff',
    },
    bottomNav: {
        height: 54,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 8,
        paddingBottom: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#333'
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
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Salads</Text>
                    </View>
                    <ListView
                        style={styles.container}
                        dataSource={this.state.dataSource}
                        renderRow={(data) => <Row {...data} />}
                    />
                </ScrollView>
                <View style={styles.bottomNav}>
                    <BottomNavItem title={"Home"} icon={require('../images/home.png')} onPress={() => alert('load more')} />
                    <BottomNavItem title={"Orders"} icon={require('../images/orders.png')} onPress={() => alert('load more')} />
                    <BottomNavItem title={"Account"} icon={require('../images/user.png')} onPress={() => alert('load more')} />
                    <BottomNavItem title={"Checkout"} icon={require('../images/scooter.png')} onPress={() => alert('load more')} count={1} />
                </View>
            </View>

        )
    }
}

