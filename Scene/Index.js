/**
 * Created by mycom on 2017-06-28.
 */

import React, {Component} from "react";
import {Image, Platform, StyleSheet, Text, TouchableOpacity} from "react-native";

import {Actions, Router, Scene} from "react-native-router-flux";
import Main from "./Main";
import Quiz from "./Quiz";
import RandomPage from "./RandomPage";
import Test from "./Test";
import DirectPage from "./DirectPage";
import Contacts from "react-native-contacts";

global.contactList = null; // sorted contacts list [{name,number}, ...]

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            cb:null
        }
    }

    componentWillMount(){
        this.getContact();
    }

    setPriority(obj){
        var char_ASCII = obj.name.charCodeAt(0);

        //공백
        if (char_ASCII == 32)
            return 0
        //특수기호
        else if ((char_ASCII>=33 && char_ASCII<=47)
            || (char_ASCII>=58 && char_ASCII<=64)
            || (char_ASCII>=91 && char_ASCII<=96)
            || (char_ASCII>=123 && char_ASCII<=126))
            return 1;
        //숫자
        else if (char_ASCII >= 48 && char_ASCII <= 57 )
            return 2;
        //영어(대문자)
        else if (char_ASCII>=65 && char_ASCII<=90)
            return 3;
        //영어(소문자)
        else if (char_ASCII>=97 && char_ASCII<=122)
            return 4;
        //한글
        else if ((char_ASCII >= 12592) || (char_ASCII <= 12687))
            return 5;
        else
            return -1;
    }

    getContact() {
        Contacts.getAll((err, contact) => {
            console.log("Contact.getAll");
            if (err === 'denied') {
                Alert.alert("contact denied error");
            } else {
                let arr = [] // arr = [ {name:xxx, age:xx}... ]

                contact.some((obj,index) => {
                    if(index!=0 && obj.phoneNumbers[0]!=null) {
                        let name = ''
                        if(obj.familyName) name += obj.familyName
                        if(obj.givenName) name += obj.givenName
                        let number = obj.phoneNumbers[0].number.replace(/-/gi,''); //remove slash
                        arr.push({
                            name : name,
                            number : number
                        })
                    }
                });
                arr.sort( (a,b)=>{
                    if( this.setPriority(a) > this.setPriority(b) ) return -1
                    if( this.setPriority(a) < this.setPriority(b) ) return 1
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                })

                global.contactList = arr;
                console.log("REDIRECT CONTACT",global.contactList)
            }
        })
    }
    componentDidMount(){
        console.log("ROUTER::",this)
    }

    render(){
        return(
            <Router navigationBarStyle={styles.navBar}
                    sceneStyle = {styles.scene}
                    titleStyle={styles.title}
            >

                <Scene key="root" >
                    <Scene
                        key="main"
                        component={Main}
                        hideNavBar={true}
                        sceneStyle ={{marginTop:0}}
                        initial={true}
                    />

                    <Scene
                        key="random"
                        component={RandomPage}
                        title="랜덤선택"
                        hideNavBar={false}
                        renderBackButton = {()=>this.backButton()}
                    />

                    <Scene
                        key="direct"
                        component={DirectPage}
                        title="직접선택"
                        hideNavBar={false}
                        renderBackButton = {()=>this.backButton()}
                    />
                </Scene>

                <Scene
                    key="quiz"
                    component={Quiz}
                    title="퀴즈"
                    hideNavBar={false}
                    renderBackButton ={()=>null}
                />

                <Scene
                    key="firebase"
                    component={Test}
                    title="firebase test"
                />
            </Router>
        )
    }

    rightButton(text,func){
        return (
            <TouchableOpacity
                onPress={()=>func}
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
