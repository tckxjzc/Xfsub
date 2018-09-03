import React, { Component } from 'react';
import { View, } from 'react-native';
import { Toolbar } from "react-native-material-ui";
import { toolBarStyle } from "./styles";
import Lists from "../../components/Lists";
class Search extends Component {
    constructor(props) {
        super(props);
        /**
         * lifecycle
         */
        this.mounted = false;
        /**
         *method
         */
        /**
         * 返回上一页
         */
        this.goBack = () => {
            this.props.navigation.goBack();
        };
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
        return <View style={{ flex: 1 }}>
            <Toolbar style={toolBarStyle} leftElement="navigate-before" onLeftElementPress={this.goBack} centerElement={this.title}/>
            <Lists navigation={this.props.navigation} loadParams={this.loadParams}/>
        </View>;
    }
}
export default Search;
