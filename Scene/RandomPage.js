import React, {Component} from "react";
import {Alert, Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View,TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux'
import Button from "../Components/Button";
const{width,height} = Dimensions.get("window");

class RandomPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            selectedContacts:[],
        }
    }

    componentWillMount(){
        this.getRandomData();
    }

    componentDidMount(){
        Actions.refresh({renderRightButton:()=>this.goQuiz("확인")})
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
                    data={this.state.selectedContacts}
                    renderItem={ ({item}) =>  <SelectedItem name={item.name} number={item.number}/> }
                    keyExtractor={ item=>item.number } // keyExtractor -> inform each of items primary key
                />
            </ScrollView>
        );
    }

    //function Lists
    _onRefresh(){
        this.setState({refreshing: true});
        this.getRandomData();
    }

    getRandomData(){
        let selectedContacts = [];                          // Selected data Array
        let tmpContacts = global.contactList.slice();     // Copy all contacts
        for(var i=0; i<10; i++) {
            let rnd = Math.floor(Math.random()*tmpContacts.length); // Get random index
            selectedContacts.push(tmpContacts[rnd]);                   // Push selected data to Array
            tmpContacts.splice(rnd,1);                                 // Remove selected data at tmpContacts
        }
        this.setState({selectedContacts:selectedContacts,refreshing: false});   // Set state for new data
    }

    goQuiz(){
        return (
            <TouchableOpacity
                onPress={()=>{Actions.quiz({list:this.state.selectedContacts})}}
                style={{justifyContent:'center', width:50,bottom:11,height:40}}>
                <Text style={{color:'white', fontSize:16, textAlign:'right'}}>확인</Text>
            </TouchableOpacity>
        );
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