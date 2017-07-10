import React, {Component} from "react";
import {Alert, Dimensions, StyleSheet, Text, View} from "react-native";
import {Actions} from "react-native-router-flux"; // New code
import Button from "../Components/Button";
import {AdMobBanner} from "react-native-admob";

let result = null;
let chart = [];

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
            questionList : this.props.list.slice(), // copy of selected list -> 문제 리스트, 0되면 종료
            answer : null,                           // 정답 1개
            examples : null,                         // 보기 3개
            score:0,                                  // 점수
            showingCorrect:false,
            showingIncorrect:false,
            onClick:0,
        }
    }
    componentWillMount(){
        this.getQuizItem();
    }

    componentWillReceiveProps(props){
        this.setState({score:props.score},()=>this.getQuizItem())
    }

    render() {
        console.log("ANSWER:",this.state.answer)
        console.log("EXAMPLES:",this.state.examples)
        return (
            <View style={{flex:1}}>
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text style={{fontWeight:'500',color:'#666666',fontSize:25}}>Score : {this.state.score}</Text>
                    <Text style={{fontSize:55}}>{this.state.answer.name}</Text>
                </View>
                <View style ={{justifyContent : "center",flex:1,marginBottom:20}}>
                    <Button
                        title={this.state.examples[0].number}
                        onPress={()=>this.isAnswer(this.state.examples[0].number)}
                        color="#ff000088"
                    />

                    <Button
                        title={this.state.examples[1].number}
                        onPress={()=>this.isAnswer(this.state.examples[1].number)}
                        color="#ff000088"
                    />

                    <Button
                        title={this.state.examples[2].number}
                        onPress={()=>this.isAnswer(this.state.examples[2].number)}
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
    isAnswer(examples){
        examples == this.state.answer.number ? this.renderCorrect(true): this.renderCorrect(false)
    }

    renderCorrect(bool) {
        if (bool) {
            this.setState({showingCorrect:true, showingCorrect:false, onClick:this.state.onClick+1});
            Actions.refresh({score:this.state.score + 10});

        } else{
            this.setState({showingIncorrect: true, showingIncorrect: false, onClick:this.state.onClick+1});
            this.setState({score:this.state.score - 5});
        }
    }

    getQuizItem () {
        if (this.state.questionList.length == 0) {
            Alert.alert(
                '퀴즈 종료',
                '최종점수 : '+this.state.score+"점"+
                "\n\n정답률 : "+parseInt(this.props.list.length/this.state.onClick*100)+"%",
                [
                    {text: '확인', onPress: () => Actions.pop()},
                ],
                { cancelable: false }
            );
        }else {
            let tmpExamples = []; // 랜덤으로 뽑기 위한 임시저장 보기 리스트
            let tmpList = [];     // 남은 문제 리스트를 임시저장
            let setExamples = []; // setState할 보기 리스트

            //문제 뽑기, 정답 설정, 뽑은거 삭제
            tmpList = this.state.questionList.slice();
            let indexOfAnswer = Math.floor(Math.random()*tmpList.length);
            this.setState({answer:tmpList[indexOfAnswer]});
            tmpExamples.push(tmpList[indexOfAnswer]);
            tmpList.splice(indexOfAnswer,1);
            this.setState({questionList:tmpList});

            //global contacts에서 정답과 겹치지 않는 보기 2개 뽑기,
            while(tmpExamples.length!=3) {
                let example = global.contactList[Math.floor(Math.random() * global.contactList.length)];
                if(tmpExamples[0].name != example.name) tmpExamples.push(example);
            }

            //tmpExamples에서 랜덤돌려서 뽑기
            for (let i = 0; i < 3; i++) {
                let rnd = Math.floor(Math.random() * tmpExamples.length);
                setExamples.push(tmpExamples[rnd]);
                tmpExamples.splice(rnd, 1);
            }

            //랜덤으로 구성된 setExamples보기 리스트 setState
            this.setState({examples:setExamples});
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