import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    ScrollView,
    Alert,
    RefreshControl,
    TouchableOpacity

} from 'react-native';

import firebase from'../Components/Firebase'
import Button from'../Components/Button'
import Contacts from "react-native-contacts"
import Router from "react-native-router-flux/src/Router";
import SelectedItem from '../Components/SelectedItem'
const {width,height} = Dimensions.get('window');

class DirectSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            name: null,
            age: null,
            contacts: null,
            selectedList : [],
        }
    }

    componentWillMount() {
        this.getContact();
    }

    render() {
        const selList = [];
        return (
            <View>
                {
                    this.state.selectedList.length!=0
                    &&
                <SelectedList list={this.state.selectedList} />
                }
                <FlatList
                    data={this.state.contacts}
                    renderItem={({item,index}) => item.phoneNumbers[0] != null ?
                        <SelectedItem
                            name={this.reNaming(item)} number={item.phoneNumbers[0].number}
                        select = {(selectedProps) =>!selectedProps?this.addSelectedList(item):this.removeSelectedList(item,this.state.selectedList)} isSelected={false} ref={"Item"+index}
                        />
                        : null}
                    keyExtractor={item => item.givenName} // keyExtractor -> inform each of items primary key
                />
            </View>
        );
    }

    addSelectedList(item){
        console.log("addSELECLTEDLIST")
        let arr = this.state.selectedList.slice();
        console.log("ARR:",arr);
        arr.push(item);
        console.log("PUSHED:",arr);
        this.setState({selectedList:arr});
    }

    removeSelectedList(item,selList){
        console.log("REMOVE ITEM:",item,"\nTARGET SEL LIST:",selList);
        let number = item.phoneNumbers[0].number;
        for(i=0; i<selList.length; i++) {
            if (selList[i].phoneNumbers[0].number == number) {
                selList.splice(i, 1);
                break;
            }
        }
        this.setState({selectedList:selList})
    }

    reNaming(item){
        let fName = item.familyName
        let gName = item.givenName
        let fullName = ""
        if(fName!=null) fullName+=fName
        if(gName!=null) fullName+=gName
        return fullName
    }

    getContact() {
        Contacts.getAll((err, contact) => {
            console.log("Contact.getAll");
            if (err === 'denied') {
                Alert.alert("error");
            } else {
                this.setState({contacts:contact})
            }
        })
    }

    saveData(name){
        firebase.database().ref('/users/test').update(name)
    }

}

class SelectedList extends Component {
    render(){
        return(
            <View style={{height:50}}>
                <FlatList
                data={this.props.list}
                renderItem={({item}) => item.phoneNumbers[0] != null ?
                    <View><Text>{this.reNaming(item)}</Text></View>
                    : null}
                keyExtractor={item => item.givenName} // keyExtractor -> inform each of items primary key
                horizontal={true}
                />
            </View>
        )
    }
    reNaming(item){
        let fName = item.familyName
        let gName = item.givenName
        let fullName = ""
        if(fName!=null) fullName+=fName
        if(gName!=null) fullName+=gName
        return fullName
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    selectedContainer:{
        flex:1,
        height:60,
        borderColor:'#dddf',
        borderWidth:0.3,alignItems:'center',
        flexDirection:'row'
    }
});


export default DirectSelect;