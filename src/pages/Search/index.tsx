import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';

import {NavigationScreenProp, NavigationState} from "react-navigation";
import {Toolbar} from "react-native-material-ui";
import {toolBarStyle} from "./styles";
import Lists from "../../components/Lists";

type Props = {
    navigation: NavigationScreenProp<NavigationState>
};

class Search extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
        this.loadParams = this.props.navigation.getParam('loadParams');
        this.title = this.props.navigation.getParam('title');
    }

    componentDidMount() {
        this.mounted = true;

    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <View style={{flex: 1}}>
            <Toolbar
                style={toolBarStyle}
                leftElement="navigate-before"
                onLeftElementPress={this.goBack}
                centerElement={this.title}
            />
            <Lists navigation={this.props.navigation} loadParams={this.loadParams}/>
        </View>
    }

    /**
     *properties
     */
    title;
    loadParams;

    /**
     *method
     */
    /**
     * 返回上一页
     */
    goBack = () => {
        this.props.navigation.goBack();
    }
}

export default Search;