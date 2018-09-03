import React, {Component} from 'react';
import {Image, Linking, ProgressBarAndroid, ScrollView, Text, ToastAndroid, View,} from 'react-native';

import {NavigationScreenProp, NavigationState} from "react-navigation";
import {Button, Card, Toolbar} from "react-native-material-ui";
import {buttonStyle, styles, toolBarStyle} from "./styles";
import data from '../../data';
import HTMLParse from "../../nativeModules/HTMLParse";
import container from "../../styles/container";

type Props = {
    navigation: NavigationScreenProp<NavigationState>
};

class Details extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;
    state = {
        link: "",
        image: ""
    };

    constructor(props) {
        super(props);
        this.data = this.props.navigation.getParam('data');
    }

    componentDidMount() {
        this.mounted = true;
        this.loadData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        let containerView;
        if (this.state.image || this.state.link) {
            containerView = <View style={styles.container}>
                {
                    this.state.image ? <Image style={styles.image} source={{uri: this.state.image}}/> : null
                }
                <Text selectable={true}>
                    {this.state.link}
                </Text>
                <Button onPress={this.download} text={'download'} style={buttonStyle} raised upperCase={false}/>


            </View>
        } else {
            containerView = <View style={styles.container}>
                <ProgressBarAndroid color={'#2bbeb6'}/>
            </View>
        }


        return <ScrollView style={container}>
            <Toolbar
                style={toolBarStyle}

                leftElement="navigate-before"
                onLeftElementPress={this.goBack}
                centerElement={this.data.title}
            />
            <Text style={styles.titleStyle}>
                {this.data.title}
            </Text>
            {containerView}
        </ScrollView>
    }

    /**
     *properties
     */
    data;
    /**
     *method
     */
    goBack = () => {
        this.props.navigation.goBack();
    };

    loadData() {
        fetch(`${data.baseUrl}${this.data.link}`, {
            headers: {
                'User-Agent': data.userAgent
            }
        }).then((response) => {
            //error
            if (!response.ok) {
                ToastAndroid.show(response.statusText, ToastAndroid.LONG);
            }
            //success
            response.text().then((text) => {
                HTMLParse.parseDetails(text, (result) => {
                    if (this.mounted) {
                        this.setState(result);
                    }
                })

            })
        });
    }

    download = () => {
        let link = this.state.link;
        Linking.canOpenURL(link).then((supported) => {
            if (supported) {
                Linking.openURL(link)
            }
        })
    };
}

export default Details;