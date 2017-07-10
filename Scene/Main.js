import React, {Component} from "react";
import {Image, View} from "react-native";
import {AdMobBanner} from "react-native-admob";
import {Actions} from "react-native-router-flux";
import Button from "../Components/Button";

class Main extends Component {

    render(){
        return(
            <View style ={{flex:1}}>
                <View style={{flex:1.2,justifyContent : "center"}}>
                <View style={{alignSelf:'center',marginBottom:100}} >
                    <Image
                        style={{width:230,height:100,}}
                        source={require('../img/logo.png')}
                        resizeMode={Image.resizeMode.contain}
                    />
                </View>
                <Button
                    title="직접 선택"
                    color="#6699fb"
                    onPress = {()=>Actions.direct()}  />
                <Button
                    title="랜덤 선택"
                    color="#85f099"
                    onPress={()=>Actions.random()}  />
                </View>

                <View style={{justifyContent : "flex-end"}}>
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID='ca-app-pub-5160798182506906/1784619271'
                    testDeviceID="EMULATOR"
                    didFailToReceiveAdWithError={this.bannerError} />
                </View>

            </View>
        );
    }
}
export default Main;