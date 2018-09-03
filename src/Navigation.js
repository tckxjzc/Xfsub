import { createStackNavigator, } from 'react-navigation';
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
let Navigation = createStackNavigator({
    Home: {
        screen: Home
    },
    Details: {
        screen: Details
    },
    Search: {
        screen: Search
    },
}, {
    cardStyle: {
        shadowColor: 'red',
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { height: 0, width: 0 },
        elevation: 0
    },
    headerMode: 'none',
    // mode: 'modal',
    initialRouteName: 'Home'
});
export default Navigation;
