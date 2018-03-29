import {default as React,Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

export default (props) =>{
		return (
      <TouchableWithoutFeedback onPress={props.chooseAddress.bind(null,props.placeId,"O")}>
        <View style={styles.container}>
              <Text style={styles.text}>
                {props.description}
              </Text>
        </View>
      </TouchableWithoutFeedback>

		)

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    borderBottomColor:"#bdc8d9",
    borderBottomWidth:StyleSheet.hairlineWidth,
    padding:10
  },
  text:{
    margin:10,
    fontSize:20,
    fontFamily:'FZZhunYuan-M02S',
  },
  row:{
    flex:1,
    flexDirection: 'row',
  },
  col:{
      flex:1,
      justifyContent:'center',
  },
  buttonText:{
    color:'#EF1654',
    fontSize:17,

  }
})
