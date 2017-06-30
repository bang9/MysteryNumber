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
            uid: null,
            name: null,
            age: null,
        }
    }
    componentWillMount(){
        this.getUserId("user1");
    }

    render(){
        return(
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <View style={{width:200}}>
                <TextInput
                    onChangeText={(text)=>this.setState({
                        uid:text
                    })}
                    placeholder="uid"
                    style={{textAlign:'center'}}
                />
                <TextInput
                    onChangeText={(text)=>this.setState({
                        name:text
                    })}
                    placeholder="name"
                    style={{textAlign:'center'}}
                />
                <TextInput
                    onChangeText={(text)=>this.setState({
                        age:text
                    })}
                    placeholder="age"
                    style={{textAlign:'center'}}
                />
                </View>
                <Button
                    title="저장"
                    color="#6699fb"
                    onPress={()=>this.saveData(this.state.name,this.state.age)}/>
                <Button
                    title="불러오기"
                    color="#6699fb"
                    onPress={()=>this.loadData()}/>
                <Button
                    title="삭제하기"
                    color="#6699fb"
                    onPress={()=>this.removeData()}/>
            </View>


        );
    }
    getUserId(uid){
        this.setState({uid:uid})
    }

    saveData(name,age){
        firebase.database().ref('/users/'+this.state.uid).update({
            name:name,
            age:age,
        })
    }
    loadData(){
        firebase.database().ref('/users/'+this.state.uid).once('value')
            .then(
                (ret)=>{
                    if(ret!=null) alert(JSON.stringify(ret.val()));
                    else alert("데이터가 없습니다.")
                }
            ).done()
    }
    removeData(){
        firebase.database().ref('/users/'+this.state.uid).remove()
    }
}
class PostContainer extends Component{
    render(){
        return(
            <View>

            </View>
        )
    }
}

export default Test;