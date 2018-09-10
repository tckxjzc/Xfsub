import { createMaterialTopTabNavigator } from 'react-navigation';
import List from "../List";
import React from 'react';
import { Text } from "react-native";
import THEME from "../../../values/THEME";
function getText(text) {
    return <Text style={{ color: THEME.PRIMARY_FONT_COLOR }}>{text}</Text>;
}
function getTitle(index) {
    switch (index) {
        case '1':
            return '星期一';
        case '2':
            return '星期二';
        case '3':
            return '星期三';
        case '4':
            return '星期四';
        case '5':
            return '星期五';
        case '6':
            return '星期六';
        case '7':
            return '星期日';
        default:
            return "error";
    }
}
function getRouters(list, navigation) {
    let routers = {};
    for (let i = 0; i < list.length; i++) {
        routers['' + list[i].day_of_week] = {
            screen: () => <List navigation={navigation} data={list[i].seasons}/>,
        };
    }
    return routers;
}
export default (data, navigation) => {
    let list = data.slice(6);
    let routers = getRouters(list, navigation);
    let Tabs = createMaterialTopTabNavigator(routers, {
        lazy: false,
        backBehavior: 'none',
        initialRouteName: '' + list[0].day_of_week,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: () => {
                const { routeName } = navigation.state;
                return getText(getTitle(routeName));
            }
        }),
        tabBarPosition: 'top',
        tabBarOptions: {
            style: {
                backgroundColor: THEME.PRIMARY_COLOR
            },
            // activeTintColor: '#fff',
            // inactiveTintColor: '#f00',
            tabStyle: {
                width: 60,
                height: 30
            },
            labelStyle: {
            // color:'#fff'
            },
            indicatorStyle: {
                backgroundColor: '#fff',
                width: 60
            },
            scrollEnabled: true
        },
    });
    return <Tabs />;
};
