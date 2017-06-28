/**
 * Created by mycom on 2017-06-28.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity
} from 'react-native';


import {Router,Scene, Actions} from "react-native-router-flux";
import Main from './Main';
import Quiz from './Quiz';
import RandomPage from './RandomPage';
global.select = null;

class App extends Component {
    render(){
        return(
            <Router navigationBarStyle={styles.navBar}
            sceneStyle = {styles.scene}
            >
                <Scene key="root">
                    <Scene
                        hideNavBar={true}
                        sceneStyle ={{marginTop:0}}
                        key="main"
                        component={Main}
                        initial={true}
                    />

                </Scene>

                <Scene
                    renderRightButton = {() => this.rightButton()}
                    hideNavBar={false}
                    key="random"
                    component={RandomPage}
                    title="랜덤 목록"

                />

                <Scene
                    hideNavBar={false}
                    key="quiz"
                    component={Quiz}
                    title="퀴즈"
                    renderBackButton ={ () => null}
                />

            </Router>
        )
    }
    rightButton(){
        return (
            <TouchableOpacity onPress={()=>Actions.quiz()}>
                <Text>확인</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    navBar:{
        backgroundColor : "#00f100",
        borderBottomWidth:0,
        borderBottomColor : "#fff"
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
    }
});

export default App;
