import React from 'react';
import  { StyleSheet, View, text } from 'react-native';
import MemoList from '../component/MemoList';
import CircleButton from '../element/CircleButton';
import firebase from 'firebase';


class MemoListScreens extends React.Component {
    state = {
        memoList: [],
    }

    componentDidMount() {
        const { currentUser } = firebase.auth();
        const db = firebase.firestore();
        db.collection(`users/${ currentUser.uid }/memos`)
        .onSnapshot((snapshot) => {
            const tempList =[];
            snapshot.forEach((doc) => {
            tempList.push({ ...doc.data(), key:doc.id });
        });
        this.setState( { memoList: tempList });

        });
    
 }


    handlePress() {
        this.props.navigation.navigate('MemoCreate');

}


    render() {
        
        return(
        <View style={styles.container}>
         <MemoList memoList={ this.state.memoList }
         navigation={ this.props.navigation }
          />
         <CircleButton onPress={ this.handlePress.bind(this) }>+</CircleButton>
        </View>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width:'100%',
    },

});


export default MemoListScreens;