/**
 * Created by mycom on 2017-06-28.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    ScrollView,
    Alert,
    RefreshControl
} from 'react-native';
import Router from "react-native-router-flux/src/Router";
import Contacts from "react-native-contacts"
import { Actions } from 'react-native-router-flux';
import Button from "../Components/Button";
const{width,height} = Dimensions.get("window");
/**
 * Created by mycom on 2017-06-28.
 */

class RandomPage extends Component {
    constructor(props) {
        super(props);
        this.state=
            {
                contacts : null,
                selectedList : [],
                refreshing:false,
            }
    }
    componentWillMount(){
        this.getContact();
    }

    render() {
        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>this._onRefresh()}
                            />
                        }>
                <Button
                    onPress={() => this._onRefresh()} //binding
                    title="재선택"
                    color="#488aff"
                />
                <FlatList
                    data={this.state.selectedList}
                    renderItem={({item}) => item.phoneNumbers[0] != null ?
                    <SelectedItem name={this.reNaming(item)} number={item.phoneNumbers[0].number}/>
                    :
                    null}
                    keyExtractor={item=>item.givenName} // keyExtractor -> inform each of items primary key
                    />
            </ScrollView>
        );
    }

    //function Lists
    _onRefresh(){
        this.setState({refreshing: true});
        this.selectData();
    }

    getContact() {
        Contacts.getAll((err, contact) => {
            console.log("Contact.getAll");
            if (err === 'denied') {
                Alert.alert("error");
            } else {
                this.setState({contacts:contact})
                global.allContacts = contact;
                this._onRefresh();
            }
        })
    }

    reNaming(item){
        let fName = item.familyName
        let gName = item.givenName
        let fullName = ""
        if(fName!=null) fullName+=fName
        if(gName!=null) fullName+=gName
        return fullName
    }

    selectData(){
        let selectedContacts = [];                          // Selected data Array
        let tmpContacts = this.state.contacts.slice();   // Copy contacts
        for(var i=0; i<30; i++) {
            let rnd = Math.floor(Math.random()*tmpContacts.length); // Get random index
            selectedContacts.push(tmpContacts[rnd]);                  // Push selected data to Array
            tmpContacts.splice(rnd,1);                                // Remove selected data at tmpContacts
        }
        global.selectedContacts = selectedContacts;                // Update global selected data
        this.setState({selectedList:selectedContacts,refreshing: false});            // Set state for new data
    }
}

class SelectedItem extends Component {
    render() {
        return (
            <View style={styles.selectedContainer}>
                <View style={{flex:1,alignItems:'flex-start'}}>
                    <Text style={{fontSize:16, marginLeft:17, fontWeight:'400',color:'black'}}>{this.props.name}</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                    <Text style={{marginRight:17}}>{this.props.number}</Text>
                </View>
            </View>
        );
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

export default RandomPage;