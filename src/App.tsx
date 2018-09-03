import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import Navigation from "./Navigation";
import SplashScreen from 'react-native-splash-screen';
type Props = {

};

class App extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        SplashScreen.hide();

    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Navigation/>
        </View>
    }

    /**
     *properties
     */

    /**
     *method
     */
}

export default App;