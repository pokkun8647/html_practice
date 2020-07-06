import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { TouchableHighlight } from 'react-native';
import * as Font from 'expo-font';
import fontAwesome from '../../assets/fonts/fa-solid-900.ttf';

class CircleButton extends React.Component {
    state = {
        fontLoaded: false,
    }

    async componentDidMount() {
        await Font.loadAsync({
            FontAwesome:fontAwesome,
        });

        this.setState( { fontLoaded: true});
    }

    render() {
        const { style,color, onPress } = this.props;
        

            let bgColor = "#FF1493";

            let textColor = "#fff";

            if(color === 'white') {
                bgColor = '#fff';
                textColor ='#FF1493';

            }

            return(
            <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
            <View style={[styles.circleButton,style, { backgroundColor: bgColor}]}>
               {
                    this.state.fontLoaded ? (
                    <Text style={[styles.circleButtonTitle, { color: textColor}]}>
                    {'\uf303'}
                    </Text>              
                    ): null
                }                
                </View>
            </TouchableHighlight>              
                
        );
    }
}

const styles = StyleSheet.create({

container: {
    width:48,
    height:48,
    position:'absolute',
     bottom:24,
     right:24,
    },

circleButton: {
     width:48,
     height:48,
     margin:8,
     borderRadius:24,
     alignItems: 'center',
     justifyContent: 'center',
     shadowColor:'#000',
     shadowOffset: { width:0, height:3},
     shadowOpacity:0.2,
     shadowRadius:3,
     elevation:4,
   },

circleButtonTitle: {
    fontFamily:'FontAwesome',
    fontSize:32,
    lineHeight:32,
}

});

export default CircleButton;