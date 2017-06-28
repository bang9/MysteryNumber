/**
 * Created by mycom on 2017-06-28.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity

} from 'react-native';
import {Actions} from "react-native-router-flux";
import Contacts from 'react-native-contacts';
import Button from '../Components/Button';


class Main extends Component {
        render(){
        return(
            <View style ={{ flex : 1, justifyContent : "center"}}>
                <View style={{margin:15}}>
                    <Button
                        title="직접 선택"
                        color="#78CDF7"
                        onPress = {()=>Actions.main()}
                    />
                </View>

                <View style ={{margin :15 }}>
                    <Button
                        onPress={()=>this.moveToRandom()} //binding
                        title="랜덤 선택"
                        color="#43F6F6"
                    />
                </View>
            </View>
        );
    }

    moveToRandom(){
        Actions.random();
    }
}
export default Main;