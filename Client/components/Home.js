import React, { Component, PropTypes } from 'react';
import { View, Image, ScrollView, Text, ListView, StyleSheet, TouchableOpacity } from 'react-native';
import FCM from 'react-native-fcm';

import IconThumb from './IconThumb';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {};
    }
    navSecond(){
        this.props.navigator.push({title: 'Senior Burrito', index: 1})
    }

    componentDidMount(){
        FCM.getFCMToken().then(token => {
            this.setState({...this.state, token});
            console.log(token);
            // store fcm token in your server
        }).catch((err)=>{
            console.log(err);
            this.setState({...this.state, err:err});});

        FCM.on('refreshToken', (token) => {
            console.log(token)
            // fcm token may not be available on first load, catch it here
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wannaEat}>
                    <TouchableOpacity onPress={() => alert('load more')}>
                        <Image source={require('../images/wanna_eat.png')} style={styles.wannaEatImage} />
                    </TouchableOpacity>
                </View>
                <View>
                    <ScrollView horizontal={true} style={styles.horizontal}>
                        <IconThumb title={"Pizza"} icon={require('../images/tags/pizza.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                        <IconThumb title={"Sushi"} icon={require('../images/tags/sushi.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                        <IconThumb title={"Burger"} icon={require('../images/tags/burger.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                        <IconThumb title={"Cake"} icon={require('../images/tags/cake.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                        <IconThumb title={"Drinks"} icon={require('../images/tags/drinks.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                        <IconThumb title={"Pasta"} icon={require('../images/tags/pasta.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                        <IconThumb title={"Seafood"} icon={require('../images/tags/seafood.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                        <IconThumb title={"Meat"} icon={require('../images/tags/meat.png')} onPress={() => alert('load more')} iconSize={ {width: 56, height: 56} } />
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={this.navSecond.bind(this)}>
                    <Text>Navigate to second screen</Text>
                </TouchableOpacity>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 56,
        backgroundColor: '#fff',
    },
    wannaEat: {
        height: 90,
        backgroundColor: '#4d9335',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    wannaEatImage: {
        width: 110,
        height: 77,
    },
    horizontal: {
        padding: 0,
    }
});

