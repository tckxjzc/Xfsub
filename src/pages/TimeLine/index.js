import React, { Component } from 'react';
import { View, } from 'react-native';
import { toolbarContainer, toolBarStyle } from './styles';
import data from '../../data';
import getTabs from './Tab';
import { Toolbar } from "react-native-material-ui";
class TimeLine extends Component {
    constructor(props) {
        super(props);
        /**
         * lifecycle
         */
        this.mounted = false;
        this.state = {
            result: 0,
        };
        /**
         *properties
         */
        /**
         *method
         */
        this.goBack = () => {
            this.props.navigation.goBack();
        };
        this.getData = () => {
            fetch('https://bangumi.bilibili.com/web_api/timeline_global', {
                headers: {
                    'User-Agent': data.webUserAgent
                }
            }).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        if (this.mounted) {
                            this.setState({ result: data.result });
                        }
                    });
                }
            });
        };
    }
    componentDidMount() {
        this.mounted = true;
        this.getData();
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        return <View style={{ flex: 1 }}>
            <View style={toolbarContainer}>
            <Toolbar style={toolBarStyle} leftElement="navigate-before" centerElement={'新番时间表'} onLeftElementPress={this.goBack}/>
            </View>
            {this.state.result ? getTabs(this.state.result, this.props.navigation) : null}
        </View>;
    }
}
export default TimeLine;
