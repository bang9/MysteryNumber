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
    View,TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import Button from "../Components/Button";

let result = null;
let chart = [];

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedContacts : null,
            quizList : [],
            answer : null,
            score:this.props.score,
            showingCorrect:false,
            showingIncorrect:false,
        }
    }
    componentWillMount(){
        console.log(global.selectedContacts);
        this.getQuizItem();
    }

    componentWillReceiveProps(props){
        this.setState({score:props.score},()=>this.getQuizItem())
    }

    render() {
        let fullName = ""
        if(this.state.answer!=null) {
            let fName = this.state.answer.familyName
            let gName = this.state.answer.givenName;
            fullName = ""
            if (fName != null) fullName += fName
            if (gName != null) fullName += gName
        }

        return (
            <View style={{flex:1}}>
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text style={{fontWeight:'500',color:'#666666',fontSize:25}}>Score : {this.state.score}</Text>
                    <Text style={{fontSize:55}}>{fullName}</Text>
                </View>
                <View style ={{justifyContent : "center",flex:1,marginBottom:20}}>
                    <Button
                        title={this.state.quizList[0].phoneNumbers[0].number}
                        onPress={()=>this.checkIndex(this.state.quizList[0].phoneNumbers[0].number)}
                        color="#ff000088"
                    />

                    <Button
                        title={this.state.quizList[1].phoneNumbers[0].number}
                        onPress={()=>this.checkIndex(this.state.quizList[1].phoneNumbers[0].number)}
                        color="#ff000088"
                    />

                    <Button
                        title={this.state.quizList[2].phoneNumbers[0].number}
                        onPress={()=>this.checkIndex(this.state.quizList[2].phoneNumbers[0].number)}
                        color="#ff000088"
                    />
                </View>
                {
                    this.state.showingCorrect &&
                    <Text style={{position: 'absolute', left:Dimensions.get('window').width/7,fontSize: 350}}>O</Text>
                }
                {
                    this.state.showingIncorrect &&
                    <Text style={{position: 'absolute', left:Dimensions.get('window').width/5,fontSize: 350}}>X</Text>
                }
            </View>


        );
    }
    checkIndex(answer){
        answer==this.state.answer.phoneNumbers[0].number ? this.renderCorrect(true): this.renderCorrect(false)
    }

    renderCorrect(bool) {
        if (bool) {
            this.setState({showingCorrect: true})
            this.setState({showingCorrect: false})
            Actions.refresh({score: this.state.score + 10})

        } else{
            this.setState({showingIncorrect: true})
            this.setState({showingIncorrect: false})
        }
    }

    getQuizItem () {
        if (global.selectedContacts.length == 0) {
            Alert.alert(
                '알림',
                '선택 화면으로 돌아갑니다.',
                [
                    {text: '네', onPress: () => Actions.pop()},
                ]
            );
        }
        else {
            let tmpAnswer = [];
            let rnd = Math.floor(Math.random() * global.selectedContacts.length);
            let choiceAnswer = global.selectedContacts[rnd];
            tmpAnswer.push(global.selectedContacts[rnd]);
            global.selectedContacts.splice(rnd, 1)

            for (var i = 0; i < 2; i++) {
                var num = Math.floor(Math.random() * global.allContacts.length);
                tmpAnswer.push(global.allContacts[num]);
            }

            let choice = [];

            for (var i = 0; i < 3; i++) {
                var num = Math.floor(Math.random() * tmpAnswer.length);
                choice.push(tmpAnswer[num]);
                tmpAnswer.splice(num, 1);
            }

            this.setState({quizList: choice, answer: choiceAnswer});
        }
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