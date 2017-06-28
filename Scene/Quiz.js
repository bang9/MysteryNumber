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
    constructor(props){
        super(props)
        this.state = {
            selectedContacts : null
        }
    }

    render() {
        console.log(global.selectedContacts);
        return (
            <View>
                <Text>{this.getQuizItem().givenName}</Text>
            </View>
        );
    }

    getQuizItem (){
        var num = Math.floor(Math.random()*30);
        return global.selectedContacts[num];
        //return this.props.selectedList[num];
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