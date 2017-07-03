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

const {width,height} = Dimensions.get('window');

class SelectedItem extends Component {
    constructor(props){
        super(props);
        this.state={
            isSelected:this.props.isSelected,
        }
    }
    onChange(cb) {
        if(this.state.isSelected)
            this.setState({isSelected:false})
        else
            this.setState({isSelected:true})
        cb;
        console.log("ITEM STATE:",this.state.isSelected);
    }

    render() {
        return (
            <View style={styles.selectedContainer}>
                <TouchableOpacity
                    onPress = {()=> this.onChange(this.props.select(this.state.isSelected))} style={{width:width, backgroundColor:this.state.isSelected?'#cccccc':'#ffffff'}}>
                    <View style={{flex:1,alignItems:'flex-start'}}>
                        <Text style={{fontSize:16, marginLeft:17, fontWeight:'400',color:'black'}}>{this.props.name}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Text style={{marginRight:17}}>{this.props.number}</Text>
                    </View>
                </TouchableOpacity>
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
export default SelectedItem;
