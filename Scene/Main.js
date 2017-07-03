/**
 * Created by mycom on 2017-06-28.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import {Actions} from "react-native-router-flux";
import Button from '../Components/Button';

class Main extends Component {
    render(){
        return(
            <View style ={{flex : 1, justifyContent : "center"}}>
                <View style={{alignSelf:'center',marginBottom:100,}} >
                    <Image
                        style={{width:230,height:100,}}
                        source={require('../img/logo.png')}
                        resizeMode={Image.resizeMode.contain}
                    />
                </View>

                <Button
                    title="직접 선택"
                    color="#6699fb"
                    onPress = {__DEV__? ()=>Actions.DirectSelect() : ()=>Alert.alert("Notice","준비중") }  />
                <Button
                    title="랜덤 선택"
                    color="#85f099"
                    onPress={()=>Actions.random({rightButton:true})}  />
            </View>
        );
    }
}
export default Main;