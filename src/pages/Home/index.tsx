import React, {Component} from 'react';
import {BackHandler, ToastAndroid, View,} from 'react-native';
import {Button, Toolbar} from "react-native-material-ui";
import {NavigationScreenProp, NavigationState} from "react-navigation";
import LoadParams, {TYPE} from "../../components/Lists/LoadParams";
import {buttonStyle, styles, toolBarStyle} from "./styles";
import Lists from "../../components/Lists";

type Props = {
    navigation: NavigationScreenProp<NavigationState>
};
const LOGOUT_TIME = 2000;

class Home extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;
    lastBackPressed;
    willFocus;
    willBlur;

    _backListener = () => {
        if (this.lastBackPressed && this.lastBackPressed + LOGOUT_TIME >= Date.now()) {
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
        return true;
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillMount() {
        this.willFocus = this.props.navigation.addListener('willFocus', () => {
            // console.log('willFocus');
            BackHandler.addEventListener('hardwareBackPress', this._backListener);
        });
        this.willBlur = this.props.navigation.addListener('willBlur', () => {
            // console.log('willBlur');
            BackHandler.removeEventListener('hardwareBackPress', this._backListener);
        })
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.willBlur) {
            this.willBlur.remove();
        }
        if (this.willFocus) {
            this.willFocus.remove();
        }
    }

    render() {
        return <View style={styles.container}>
            <Toolbar
                leftElement="menu"
                centerElement="HOME"
                searchable={{
                    autoFocus: true,
                    placeholder: '搜索',
                    onChangeText: this.setText,
                    onSubmitEditing: this.search
                }}
                style={toolBarStyle}

            />
            <View style={styles.topContainer}>
                <Button onPress={this.goToTimeLine} style={buttonStyle} text={'新番时间表'} primary raised />
                {/*<Button style={buttonStyle} text={'收藏'} primary raised />*/}
            </View>
            <Lists navigation={this.props.navigation} loadParams={new LoadParams()}/>
            {/*<Card onPress={() => {*/}
                {/*this.goToCategory(1, "动画");*/}
            {/*}}>*/}
                {/*<View>*/}
                    {/*<Image style={{width: '100%', height: 200}} source={require("../../assets/0842.png")}/>*/}
                {/*</View>*/}
            {/*</Card>*/}
        </View>
    }

    /**
     *properties
     */

    text;
    /**
     *method
     */
    setText = (text) => {
        this.text = text;
    };
    search = () => {
        if (this.text) {
            let loadParams = new LoadParams();
            loadParams.keyword = this.text;
            loadParams.type = TYPE.SEARCH;
            this.props.navigation.navigate('Search', {loadParams, title: this.text});
        }
    };
    goToTimeLine=()=>{
        this.props.navigation.navigate('TimeLine');
    };
    goToCategory(category, title: string) {
        let loadParams = new LoadParams();
        loadParams.category = category;
        loadParams.type = TYPE.SORT;
        this.props.navigation.navigate('Search', {loadParams, title: title});
    }
}


export default Home;