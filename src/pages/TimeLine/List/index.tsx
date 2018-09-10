import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    Text,
    View,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from "react-navigation";
import {Card} from "react-native-material-ui";
import LoadParams, {TYPE} from "../../../components/Lists/LoadParams";
import styles from "./styles";

type Props = {
    data,
    navigation: NavigationScreenProp<NavigationState>
};

class List extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        let {data} = this.props;
        return <ScrollView style={styles.container}>
            {
                data.map((item, index) => {
                    return <Card onPress={() => {
                        this.search(item.title)
                    }} key={item.season_id}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={{uri:item.cover}} style={styles.image} />
                            <View style={styles.itemContainer}>
                                <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                                <Text style={styles.index}>{item.pub_index}</Text>
                                <Text style={styles.time}>{item.delay?item.delay_reason:item.pub_time}</Text>
                            </View>
                        </View>

                    </Card>
                })
            }
        </ScrollView>
    }


    /**
     *properties
     */

    /**
     *method
     */
    search = (text) => {
        let loadParams = new LoadParams();
        loadParams.keyword = text;
        loadParams.type = TYPE.SEARCH;
        this.props.navigation.navigate('Search', {loadParams, title: text});

    };
}

export default List;