import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TextInput

} from 'react-native';

import firebase from'../Components/Firebase'
import Button from'../Components/Button'

class Test extends Component{
    constructor(props){
        super(props)
        this.state= {
            author: null,
            title: null,
            body: null,
            comments:null,
            key :null,
            temp : []
        }
    }


    render(){
        return(
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <View style={{width:200}}>
                <TextInput
                    onChangeText={(text)=>this.setState({
                        author:text
                    })}
                    placeholder="author"
                    style={{textAlign:'center'}}
                />
                <TextInput
                    onChangeText={(text)=>this.setState({
                        title:text
                    })}
                    placeholder="title"
                    style={{textAlign:'center'}}
                />
                <TextInput
                    onChangeText={(text)=>this.setState({
                        body:text
                    })}
                    placeholder="body"
                    style={{textAlign:'center'}}
                />
                <TextInput
                    onChangeText={(text)=>this.setState({
                        comments:text
                    })}
                    placeholder="comments"
                    style={{textAlign:'center'}}
                />
            </View>

                <Button
                    title="저장"
                    color="#7799fb"
                    onPress={()=>this.saveData(this.state.author,this.state.title,this.state.body,this.state.comments)}/>
                <Button
                    title="불러오기"
                    color="#7799fb"
                    onPress={()=>this.loadData()}/>
                <Button
                    title="삭제하기"
                    color="#7799fb"
                    onPress={()=>this.removeData()}/>
            </View>


        );
    }

    saveData(author,title,body,comments){
        var postData = {
            author: author,
            body: body,
            title: title,
            comments:comments,
        };

        var newPostKey = firebase.database().ref().child('posts').push().key;
        this.setState({key:newPostKey})
        var updates = {};
        updates['/posts/' + newPostKey] = postData;

        firebase.database().ref('/users-posts/').once('value',
            (ret)=>{
                alert(JSON.stringify(ret.val()))
                if(ret.val() != null){
                    let x =ret.val()
                    x.push(this.state.key)
                    this.setState({temp : x})
                    firebase.database().ref('/users-posts/').update(x)
                }else{
                    let x = []
                    x.push(this.state.key)
                    this.setState({temp : x})
                    firebase.database().ref('/users-posts/').update(x)

                }
            })
        return firebase.database().ref().update(updates);
    }

    loadData(){
        firebase.database().ref('posts/'+this.state.key).once('value', (ret)=>{
                    if(ret!=null) alert(JSON.stringify(ret.val()));
                    else alert("데이터가 없습니다.")
                }).done()

    }

    removeData(){
        var x = this.state.temp.length-1;
        firebase.database().ref('/posts/'+this.state.temp[x]).remove()
        firebase.database().ref('/users-posts/'+x).remove()
        this.state.temp.splice(x,1)
    }
}

export default Test;