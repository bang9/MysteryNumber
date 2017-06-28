/**
 * Created by mycom on 2017-06-28.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList

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
                seletedData : []
            }
    }

    componentWillMount(){
        this.getContact();
    }
    getContact() {
        Contacts.getAll((err, contact) => {
            console.log("Contact.getAll");
            if (err === 'denied') {
                Alert.alert("error");
            } else {
                this.setState({contacts:contact})
                this.selectData();
            }
        })
    }

    selectData(){
        let arr = [];

        for(var i=0; i<30; i++) {
            let rnd = Math.floor(Math.random()*this.state.contacts.length);
            arr.push(this.state.contacts[rnd]);
            let tmp = this.state.contacts;
            tmp.splice(rnd,1);
            this.setState({contacts:tmp})
        }
        this.setState({selectedData:arr});
        global.select = arr;
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={()=>this.selectData()} //binding
                    title="재선택"
                    color="#43F6F6"
                />
                <FlatList
                    data = {this.state.selectedData}
                    renderItem ={({item}) => item.phoneNumbers[0] != null ?<Text>{item.givenName + "  " + item.phoneNumbers[0].number}</Text>
                    : null}
                />

            </View>
        );
    }

    test(){
        console.log(this.state.selectedData);
    }
}



class Buttontest extends Component{
    render(){
        const test = this.props.parent;
        return(
            <View>
                <TouchableOpacity style={{backgroundColor :"#fff"}}
                                  onPress ={()=>{test.setState({test:test.state.test+1})}}>
                    <Text>{test.state.test}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:53,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb0000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
});

export default RandomPage;