import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity

} from 'react-native';

class Button extends Component{
    render(){
        return(
            <TouchableOpacity
                style ={[{margin:15,justifyContent:'center',alignSelf:'center',
                    height:50 , width:300, backgroundColor:this.props.color, borderRadius:5},
                this.props.customStyle]}
                onPress = {this.props.onPress}>
                <Text style={{alignSelf:'center',fontSize:18,color:'white'}}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

export default Button;