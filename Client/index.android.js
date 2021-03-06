import React, {Component} from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Home from './components/Home';
import MyScene from './components/TestScene';
import Category from './components/Category';
import ProductDetail from './components/ProductDetail'
import Checkout from './components/Checkout'
import ClientOrders from './components/ClientOrders'

import categories from './data/Categories';



import BottomNavItem from './components/BottomNavItem';

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#eee',
        flex: 1,
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 17,
    },
    navBarTitleText: {
        color: '#333',
        fontWeight: '500',
    },
    navBarLeftButton: {
        paddingLeft: 10,
        marginVertical: 3,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        color: 'blue',
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
    home: {
        paddingBottom: 0,
    }
});

export default class Burrivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: null
        };
    }

    render() {
        const routes = [
            {title: 'Home', index: 0},
            {title: 'Categories', index: 1},
            {title: 'Products', index: 2},
            {title: 'Add to Cart', index: 3},
            {title: 'Checkout', index: 4},
            {title: 'Orders', index: 5},
        ];

        var self = this;

        return (
            <View style={{ flex: 1, }}>
                <Navigator
                    initialRoute={routes[0]}
                    initialRouteStack={routes}
                    renderScene={function(route, navigator) {
                    return (
                        <View style={{ flex: 1, }}>
                            {this.renderRouteScene(route,navigator)}
                            <View style={styles.bottomNav}>
                                <BottomNavItem title={"Home"} icon={require('./images/home.png')} onPress={() => navigator.push({index: 0,title: 'Home'})} />
                                <BottomNavItem title={"Orders"} icon={require('./images/orders.png')} onPress={() => navigator.push({index:5,title:'Orders'})} />
                                <BottomNavItem title={"Account"} icon={require('./images/user.png')} onPress={() => alert('load more')} />
                                <BottomNavItem title={"Checkout"} icon={require('./images/scooter.png')} onPress={() => navigator.push({index:4,title:'Checkout'})} count={this.state.count} />
                            </View>
                        </View>)

                    }.bind(this)}
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={NavigationBarRouteMapper}
                            style={styles.navBar}
                        />
                    }
                    configureScene={(route, routeStack) =>
                        Navigator.SceneConfigs.PushFromRight}
                />

            </View>
        )
    }

    renderRouteScene(route, navigator){
        switch (route.index) {
            case 0:
                return (<Home navigator={navigator}  style={styles.home}/>);
            case 1:
                return (<Category navigator={navigator}  title={'Kuku'} data={categories} />)
            case 2:
                return (<MyScene navigator={navigator} title={'Salads'}/>)
            case 3:
                return (<ProductDetail navigator={navigator} title={'Salads'} productId={route.productId}/>)
            case 4:
                return (<Checkout navigator={navigator} title={'Salads'}/>)
            case 5:
                return (<ClientOrders navigator={navigator} title={'Client Orders'}/>)
        }
    }
}

const NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return null;
        } else {
            const previousRoute = navState.routeStack[index - 1];
            return (
                <TouchableOpacity
                    onPress={() => navigator.pop()}
                    style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        <Image source={require('./images/left-arrow-angle.png')} style={{ width: 16, height: 16 }} />
                    </Text>
                </TouchableOpacity>
            );
        }
    },

    RightButton: function(route, navigator, index, navState) {
        return null;
    },

    Title: function(route, navigator, index, navState) {
        if (index === 0 ) {
            return (
                <Text style={[styles.navBarText, styles.navBarTitleText]}>
                    Burrivery
                </Text>
            )

        } else {
            return (
                <Text style={[styles.navBarText, styles.navBarTitleText]}>
                    {route.title}
                </Text>
            );
        }
    },

};

AppRegistry.registerComponent('Burrivery', () => Burrivery);
