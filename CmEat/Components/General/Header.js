import {default as React,Component} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../fontConfig.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const {width,height} = Dimensions.get('window');
let marginTop,headerHeight;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 34;
  headerHeight = 88
}else{
  marginTop = 20;
  headerHeight = 64
}

export default (props) =>{

  let backIcon;
  if(props.leftButtonText){
     backIcon = props.leftButtonText;
  }else{
     backIcon = '<';
  }
  const leftButton = () => {
    if(props.goBack){
      return (
        <TouchableOpacity style={{flex:0.2,}}
                          onPress={props.goBack}>
          <View style={styles.backButton}>
            <Icon name="cm-close" size={30} color="#000000" />
          </View>
        </TouchableOpacity>
      )
    }else{
      return(
        <View style={{flex:0.2}}>
        </View>
      )

    }
  }
  const rightButton = () => {
    if(props.rightButton && props.rightButtonText){
      return (
          <TouchableOpacity style={{flex:0.2,}}
                            onPress={props.rightButton}>
            <View style={styles.rightButton}>
              <Text style={styles.rightButtonText}>
                  {props.rightButtonText}
              </Text>
            </View>
          </TouchableOpacity>
      )
    } else if (props.rightButton && props.rightButtonImage){
      // let image;
      // switch (props.rightButtonImage) {
      //   case 'icon_search_input':
      //       image = require('./Image/icon_search_input.png')
      //     break;
      //   default:
      //
      // }
      return(
        <TouchableOpacity style={{flex:0.2,}}
                          onPress={props.rightButton}>
          <View style={styles.rightImage}>
          <Image style={{width:18,height: 20,}}
                 source={props.rightButtonImage}/>
          </View>
        </TouchableOpacity>
      )

    }else{
      return(
        <View style={{flex:0.2}}>
        </View>
      )

    }
  }

  return (
    <View style={styles.container}>
      <View style={{  flex:1,
                      flexDirection:'row',}}>
        {leftButton()}
        <View style={styles.titleView}>
          <Text style={styles.title}numberOfLines={1}>
            {props.title}
          </Text>
        </View>
        {rightButton()}
      </View>

    </View>
    )
    // <View style={{height:0.5,backgroundColor:'#bdc8d9'}}/>
}
const styles = StyleSheet.create({
  container:{
    top:0,
    left:0,
    right:0,
    height:headerHeight,
    backgroundColor:'#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bdc8d9',
  },
  backButton:{
    position:'absolute',
    bottom:10,
    left:10,
  },
  backIcon:{
    fontSize:30,
    color:'#363646',
  },
  rightButton:{
    position:'absolute',
    bottom:10,
    height:30,
    alignSelf:'flex-end',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#363646',
    borderWidth:1,
    borderRadius:8,
    paddingLeft:5,
    paddingRight:5,
    right:10
  },
  rightImage:{
      position:'absolute',
      bottom:10,
      height:30,
      alignSelf:'flex-end',
      alignItems:'center',
      justifyContent:'center',
      paddingLeft:5,
      paddingRight:5,
      right:10
  },
  rightButtonText:{
    fontSize:16,
    color:'#363646',
  },
  TagBox:{
    marginLeft:8,
    marginRight:8,
    marginTop: 2,
    marginBottom: 2,
  },

  TagText:{
    fontSize:14,
  },
  blueBorder:{
    borderColor:'#979797',
  },

  blue:{
    color:'#8bc1c1',
  },
  iconSubmit:{
    width: 22,
    height: 22,
    marginRight:5,
  },
  titleView:{
    flex:1,
    flexDirection:"column-reverse",
  },
  title:{
    color:'#363646',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    fontFamily:'FZZongYi-M05S',
    marginBottom:10,
  },
})
