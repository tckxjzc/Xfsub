import React, {Component} from 'react';
import {FlatList, RefreshControl, Text, ToastAndroid, View,} from 'react-native';
import {NavigationScreenProp, NavigationState} from "react-navigation";
import HTMLParse from "../../nativeModules/HTMLParse";
import {ActionButton, Card} from "react-native-material-ui";
import {cardStyle, styles} from './styles';
import data from '../../data';

type Props = {
    navigation: NavigationScreenProp<NavigationState>,
    loadParams: any
};

class Lists extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    state = {
        data: [],
        refreshing: true
    };

    constructor(props) {
        super(props);

        this.loadParams = this.props.loadParams;
    }

    componentDidMount() {
        this.mounted = true;
        this.loadData();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return <View style={{flex: 1}}>

            <FlatList
                style={[styles.container]}
                renderItem={this.renderItem}
                onEndReached={this.loadData}
                onEndReachedThreshold={0.3}

                refreshControl={
                    <RefreshControl
                        onRefresh={this.refresh}
                        refreshing={this.state.refreshing}
                        colors={['#55c3dc']}

                    />
                }

                data={this.state.data}/>


        </View>
    }

    /**
     *properties
     */
    title;
    maxPage;
    loadParams;
    /**
     *method
     */
    getUrl = () => {
        return this.loadParams.getUrl();
    };
    /**
     * 加载数据
     */
    loadData = () => {
        if (this.loadParams.page > this.maxPage) {
            return
        }
        //开始加载
        this.setState({refreshing: true});
        fetch(this.getUrl(), {
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
                if (!this.maxPage) {
                    HTMLParse.parseMaxPage(text, (maxAge) => {
                        this.maxPage = maxAge;
                    })
                }
                HTMLParse.parseLists(text, (result) => {
                    //加载完成
                    if (this.mounted) {
                        this.loadParams.page++;
                        this.setState({data: this.state.data.concat(result), refreshing: false});
                    }

                })
            });
        })
    };
    /**
     * 渲染item
     */
    renderItem = ({item}) => {
        return <Card onPress={() => {
            this.props.navigation.navigate("Details", {data: item});
        }} style={cardStyle}>
            <View>
                <Text>{item.title}</Text>
                <View style={styles.itemContainer}>
                    <Text>{item.date}</Text>
                    <Text>{item.size}</Text>
                </View>
            </View>
        </Card>
    };
    /**
     * 下拉刷新
     */
    refresh = () => {
        this.loadParams.page = 1;
        this.setState({data: []});
        this.loadData();
    };

    test = () => {
        console.log('=============test===================')
    };

}


export default Lists;