import {StyleSheet,Dimensions} from 'react-native';
import THEME from "../../values/THEME";

let width=Dimensions.get("window").width*0.4;
export let toolBarStyle = {
    container: {
        backgroundColor: THEME.PRIMARY_COLOR
    },
    // titleText:{
    //     fontSize:12
    // }
};
export let buttonStyle={
    container:{
        marginTop:20,
        backgroundColor: THEME.PRIMARY_COLOR,
    },
    text:{
        color:'#fff'
    }
};

export let styles = StyleSheet.create({
    titleStyle: {
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 15,
        textAlign: 'center'
    },
    container:{
        flex:1,
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        width:width,
        height:width*16/9,
        marginBottom:20,
    }
});