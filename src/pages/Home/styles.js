import { StyleSheet } from 'react-native';
import THEME from "../../values/THEME";
export let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 5,
    }
});
export let buttonStyle = {
    container: {
        width: 160,
        height: 30,
        // borderRadius:10,
        backgroundColor: THEME.PRIMARY_COLOR
    }
};
export let toolBarStyle = {
    container: {
        backgroundColor: THEME.PRIMARY_COLOR
    }
};
