import React, {Component} from 'react';
import {
    TabBarIOS,
    Text,
    View,
} from 'react-native';
import {toolbarContainer, toolBarStyle} from './styles';
import {NavigationScreenProp, NavigationState} from "react-navigation";
import data from '../../data';
import getTabs from './Tab';
import {Toolbar} from "react-native-material-ui";

type Props = {
    navigation: NavigationScreenProp<NavigationState>
};

class TimeLine extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;
    state = {
        result: 0,

    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <View style={{flex: 1}}>
            <View style={toolbarContainer}>
            <Toolbar
                style={toolBarStyle}
                leftElement="navigate-before"
                centerElement={'新番时间表'}
                onLeftElementPress={this.goBack}
            />
            </View>
            {
                this.state.result ? getTabs(this.state.result, this.props.navigation) : null
            }
        </View>
    }

    /**
     *properties
     */

    /**
     *method
     */
    goBack=()=>{
        this.props.navigation.goBack();
    };
    getData = () => {
        fetch('https://bangumi.bilibili.com/web_api/timeline_global', {
            headers: {
                'User-Agent': data.webUserAgent
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    if (this.mounted) {
                        this.setState({result: data.result});
                    }
                });
            }
        })
    };

}

export default TimeLine;