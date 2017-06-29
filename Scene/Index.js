/**
 * Created by mycom on 2017-06-28.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';


import {Router,Scene, Actions} from "react-native-router-flux";
import Main from './Main';
import Quiz from './Quiz';
import RandomPage from './RandomPage';

global.selectedContacts = null;

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            rightButton : false
        }
    }
    render(){
        return(
            <Router navigationBarStyle={styles.navBar}
                    sceneStyle = {styles.scene}
                    titleStyle={styles.title}
            >

                <Scene key="root">
                    <Scene
                        key="main"
                        component={Main}
                        hideNavBar={true}
                        sceneStyle ={{marginTop:0}}
                        initial={true}
                    />

                </Scene>

                <Scene
                    key="random"
                    component={RandomPage}
                    title="랜덤 목록"
                    hideNavBar={false}
                    renderRightButton = {()=>this.moveQuizButton("확인")}
                    renderBackButton = {()=>this.backButton()}
                />

                <Scene
                    key="quiz"
                    component={Quiz}
                    title="퀴즈"
                    hideNavBar={false}
                    renderBackButton ={()=>null}
                />

            </Router>
        )
    }

    moveQuizButton(text){
        let selectedList = global.selectedContacts;
        return (
            <TouchableOpacity
                onPress={()=>Actions.quiz({selectedList:selectedList,score:0})}
                style={{justifyContent:'center', width:50,bottom:11,height:40}}>
                <Text style={{color:'white', fontSize:16, textAlign:'right'}}>{text}</Text>
            </TouchableOpacity>
        );
    }
    backButton(){
        return (
            <TouchableOpacity
            onPress={()=>Actions.pop()}
            style={{}}>
                <Image
                    style={{width:25,height:25,}}
                    source={require('../img/backButton.png')}
                    resizeMode={Image.resizeMode.contain}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    navBar:{
        backgroundColor : "#00a5f7",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    scene: {
        flex :1,
        marginTop : (Platform.OS === 'ios') ? 64 : 54
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        color:'white',
    }
});

export default App;
