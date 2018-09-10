import {StyleSheet} from 'react-native';
import THEME from "../../../values/THEME";

let imageHeight=160;
export default StyleSheet.create({
    container: {flex: 1, backgroundColor: '#fff'},
    image:{
        width:imageHeight*48/64,
        height:imageHeight
    },
    itemContainer:{
        height:imageHeight,
        flexDirection:'column',
        // alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
    },
    title:{
        fontSize:16,
        // backgroundColor:'#f00',
        color:THEME.PRIMARY_COLOR
    },
    index:{
        color:'#727272'
    },
    time:{
        color:'#a0a0a0'
    }
});