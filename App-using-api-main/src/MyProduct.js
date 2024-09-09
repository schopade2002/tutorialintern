import React from "react";
import {Text,View,StyleSheet,StatusBar} from 'react-native'

export function MyProduct({navigation}){
    return(
        <View style = {style.Container}>
            <Text style = {{alignSelf:'center',justifyContent:'center'}}>Sanskar</Text>
        </View>
    )
}
const style = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'white'
    }
})