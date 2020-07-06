import React, { memo } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import CircleButton from '../element/CircleButton';


    // FirebaseのTimestampを一般的な日付文字列にする関数
const dateString = (date) => {
    // 存在しない場合は空文字列を返すと安全です
    if (date == null) { return ''; }
    // firebaseのTimestamp型をDate型に変換する
    const dateObject = date.toDate();
    // Dateオブジェクトを文字列に変換する
    return dateObject.toISOString().split('T')[0];
  }



class MemoDetailScreens extends React.Component {
    state = {
        memo: {},
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState( { memo: params.memo });

    }

    returnMemo(memo) {
        this.setState({ memo })

    }


    render() {
        const { memo } = this.state;
        const { body, createdOn } = memo;

        return(
            <View style={styles.container}>
            <View>
            <View style={styles.memoHeader}>
            <Text style={styles.memoHeaderTitle}>{ memo.body ? memo.body.substring(0, 10) : '' }</Text>
            <Text style={styles.memoHeaderDate}>{ dateString(memo.createdOn) }</Text>
            </View>
            </View>
            <View style={styles.memoContents}>
            <Text style={styles.memoBody}>
            { memo.body }
            </Text>
            </View>

            <CircleButton color="white" 
            style={styles.editButton} 
            onPress={() => { this.props.navigation.navigate
            ('MemoEdit',{ memo, returnMemo: this.returnMemo.bind(this)}) }}>
            +
            </CircleButton>


            </View>



        );  
    }

}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        width:'100%',
    },

    memoHeader: {
        height:100,
        backgroundColor:'#FFD5EC',
        justifyContent:'center',

    },

    memoHeaderTitle: {
        fontSize:20,
        fontWeight:"bold",
        marginBottom:4,

    },
    
    memoHeaderDate: {
        fontSize:12,
        color:'#777777',
        
    },

    memoContents: {
        
        paddingTop:30,
        paddingLeft:20,
        paddingRight:20,
        color:'#777777',
        backgroundColor:'#FFFFBB',
        flex: 1,
        
    },

    editButton: {
        top:38,

    },

    memoBody: {
        lineHeight:22,
        fontSize:15,

    },

});

export default MemoDetailScreens;