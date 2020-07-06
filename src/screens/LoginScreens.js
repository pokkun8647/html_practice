import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import Loading from '../element/Loading';

class LoginScreens extends React.Component {
    state = {
        email: 'pokkun1234@gmail.com',
        password: '123456',
        isLoading: true,    
    }

    async componentDidMount() {
        const email = await SecureStore.getItemAsync('email');
        const password = await SecureStore.getItemAsync('password');
        if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState( { isLoading: false });
            this.navigateToHome();
        });
    }
}

navigateToHome() {
    const resetAction = StackActions.reset({
        index:0,
        actions: [
         NavigationActions.navigate( { routeName: 'Home' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);


}

        handleSubmit() {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                SecureStore.setItemAsync('email', this.state.email )
                SecureStore.setItemAsync('password', this.state.password )
                this.navigateToHome();
            })
            .catch();
        }

        handlePress() {
            this.props.navigation.navigate('SignUp');
        }
        
    render() {
        return(
            <View style={styles.container}>
                <Loading text="Loading..." isLoading={this.state.isLoading} />
                <Text style={styles.title}>
                ログイン
                </Text>
                <TextInput
                style= {styles.input}
                value={ this.state.email }
                 onChangeText={(text) =>{ this.setState( { email:text} ); }}
                 placeholder="Email Address" 
                 />
                <TextInput 
                style={styles.input} 
                value= { this.state.password }
                onChangeText={(text) =>{ this.setState( { password:text} ); }}
                placeholder="Password" 
                secureTextEntry

                 />
                <TouchableHighlight style={styles.button} onPress={ this.handleSubmit.bind(this)}>
                <Text style={styles.buttonTitle}>ログインする</Text>
                </TouchableHighlight>

                <TouchableOpacity style={styles.signUp} onPress ={ this.handlePress.bind(this)}>
                    <Text style={styles.signUpText}>メンバー登録する</Text>
                </TouchableOpacity>
                </View>



        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        padding:24,
        backgroundColor:'#fff',

    },

    input: {
        backgroundColor:'#eee',
        height:48,
        marginBottom:16,
        borderWidth:1,
        borderColor:'#DDD',
        padding:8,
        fontSize:20,
    },

    title: {
        fontSize:28,
        alignSelf:'center',
        marginBottom:24,
    },

    button: {
        backgroundColor:'#FF1493',
        height:48,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        width:'70%',
        alignSelf:'center',

    },

    buttonTitle: {
        color:'#fff',
        fontSize:18,
    },

    signUp: {
        marginTop:16,
        alignSelf:'center',
        backgroundColor:'#CC00FF',
        height:48,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        width:'70%',
        alignSelf:'center',

    },

    signUpText: {
        fontSize:16,
        color:'#fff',
    },
    
});

export default LoginScreens;