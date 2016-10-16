import React, {Component} from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Home from './components/Home';
import MyScene from './components/TestScene';

import BottomNavItem from './components/BottomNavItem';

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#fff',
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

    render() {
        const routes = [
            {title: 'Home', index: 0},
            {title: 'Categories', index: 1},
            {title: 'Products', index: 2},
            {title: 'Add to Cart', index: 3},
        ];

        return (
            <View style={{ flex: 1, }}>
                <Navigator
                    initialRoute={routes[0]}
                    initialRouteStack={routes}
                    renderScene={function(route, navigator) {
                        switch (route.index) {
                            case 0:
                                return (<Home navigator={navigator}  style={styles.home}/>);
                            case 1:
                                return (<MyScene title={'Salads'} data={require('./components/Data')} />)
                            case 2:
                                return (<MyScene title={'Salads'} data={require('./components/Data')} />)
                            case 3:
                                return (<MyScene title={'Salads'} data={require('./components/Data')} />)
                        }
                    }}
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={NavigationBarRouteMapper}
                            style={styles.navBar}
                        />
                    }
                    configureScene={(route, routeStack) =>
                        Navigator.SceneConfigs.PushFromRight}
                />
                <View style={styles.bottomNav}>
                    <BottomNavItem title={"Home"} icon={require('./images/home.png')} onPress={() => alert('load more')} />
                    <BottomNavItem title={"Orders"} icon={require('./images/orders.png')} onPress={() => alert('load more')} />
                    <BottomNavItem title={"Account"} icon={require('./images/user.png')} onPress={() => alert('load more')} />
                    <BottomNavItem title={"Checkout"} icon={require('./images/scooter.png')} onPress={() => alert('load more')} count={1} />
                </View>
            </View>
        )
    }
}

const NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return (
                <TouchableOpacity
                    onPress={() => alert('hooi!111')}
                    style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        X
                    </Text>
                </TouchableOpacity>
            )
        } else {
            const previousRoute = navState.routeStack[index - 1];
            return (
                <TouchableOpacity
                    onPress={() => navigator.pop()}
                    style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        {previousRoute.title}
                    </Text>
                </TouchableOpacity>
            );
        }


    },

    RightButton: function(route, navigator, index, navState) {
        return null;
    },

    Title: function(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title} [{index}]
            </Text>
        );
    },

};

AppRegistry.registerComponent('Burrivery', () => Burrivery);
