import React, {Component} from "react";
import {Alert, Dimensions, FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux'
import SelectedItem from "../Components/SelectedItem";
const {width,height} = Dimensions.get('window');

class DirectPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copyContacts:global.contactList.slice(),
            selectedContacts:[],
        }
    }

    render() {
        return (
            <View>
                { this.state.selectedContacts.length!=0 &&
                <SelectedList list={this.state.selectedContacts} goQuiz={()=>Actions.quiz({list:this.state.selectedContacts})}/> }
                <FlatList
                    data={this.state.copyContacts}
                    renderItem={ ({item}) =>
                        <SelectedItem
                            name={item.name} number={item.number}
                            select = {(selectedProps) =>
                                !selectedProps ? this.addSelectedList(item) : this.removeSelectedList(item,this.state.selectedContacts)}
                            isSelected={false}
                        />  }
                    keyExtractor={item => item.name} // keyExtractor -> inform each of items primary key
                />
            </View>
        );
    }

    addSelectedList(item){
        let list = this.state.selectedContacts.slice();
        console.log("ARR:",list);
        list.push(item);
        console.log("PUSHED:",list);
        this.setState({selectedContacts:list});
    }

    removeSelectedList(item,list){
        console.log("REMOVE ITEM:",item,"\nTARGET SEL LIST:",list);
        let number = item.number;
        for(i=0; i<list.length; i++) {
            if (list[i].number == number) {
                list.splice(i, 1);
                break;
            }
        }
        this.setState({selectedContacts:list})
    }
}

class SelectedList extends Component {
    render(){
        return(
            <View style={{height:40,backgroundColor:'#f2f2f2',flexDirection:'row',alignItems:'center'}}>
                <FlatList
                    data={this.props.list}
                    renderItem={({item}) =>
                        <View style={{justifyContent:'center',height:30,borderRadius:15, marginLeft:5,backgroundColor:'#d1eaff'}}>
                            <Text style={{fontSize:14,marginRight:8,marginLeft:8}}>{item.name}</Text>
                        </View> }
                    keyExtractor={item => item.number} // keyExtractor -> inform each of items primary key
                    horizontal={true}
                />
                <TouchableOpacity onPress={this.props.goQuiz}>
                    <View style={{alignSelf:'center',width:50}}>
                        <Text style={{alignSelf:'center',fontSize:17}}>확인</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
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


export default DirectPage;