import React, {Component} from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Home from './components/Home';
import MyScene from './components/TestScene';

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
});

export default class Burrivery extends Component {

    render() {
        const routes = [
            {title: 'Home', index: 0},
            {title: 'Senior Burrito', index: 1},
        ];

        return (
            <View style={{ flex: 1, }}>
                <Navigator
                    initialRoute={routes[1]}
                    initialRouteStack={routes}
                    renderScene={function(route, navigator) {
                        switch (route.index) {
                            case 0:
                                return (<Home navigator={navigator} />);
                            case 1:
                                return (<MyScene />)
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
