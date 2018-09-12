import React, { Component } from 'react';
import codePush from "react-native-code-push";
import { View } from 'react-native';
import Navigation from "./Navigation";
import SplashScreen from 'react-native-splash-screen';
class App extends Component {
    constructor(props) {
        super(props);
        /**
         * lifecycle
         */
        this.mounted = false;
    }
    componentDidMount() {
        this.mounted = true;
        codePush.sync();
        SplashScreen.hide();
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        return <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Navigation />
        </View>;
    }
}
export default App;
