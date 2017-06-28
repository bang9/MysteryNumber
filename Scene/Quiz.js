/**
 * Created by mycom on 2017-06-28.
 */
/**
 * Created by mycom on 2017-06-28.
 */
// app/ScarletScreen.js

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

class Quiz extends Component {

    render() {
        console.log(global.select);
        return (
            <View>
                <Text>{this.quizItem().givenName}</Text>
            </View>
        );
    }

    quizItem (){
        var num = Math.floor(Math.random()*30);
        return global.select[num];
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666666',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});

export default Quiz;