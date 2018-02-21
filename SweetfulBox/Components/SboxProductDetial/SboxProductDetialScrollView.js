// @flow
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Image,
  View,
} from 'react-native';


import CardView from './CardView';
const SCREEN_WIDTH = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');

const xOffset = new Animated.Value(0);

const onScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { x: xOffset } } }],
  { useNativeDriver: true }
);

function Page(props: { children?: ReactElement<*> }) {
  return (
    <View style={style.scrollPage}>
      {props.children}
    </View>
  )
}
function Card(props: { page: object, index: number }) {
  return (
    <Animated.View style={[style.card, rotateTransform(props.index)]}>
      <Image source={{uri: props.page.image_url}}
             style={{ width: width*0.446,
                      height: width*0.446*1.4043}}/>
    </Animated.View>
  );
}
function rotateTransform(index: number) {
  if (Platform.OS === 'ios') {

    // 0 - 375
    return {
      transform: [{
        translateX: xOffset.interpolate({
          inputRange: [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
          // outputRange: [-width*0.5, 0, width*0.5],
          outputRange: [-width*0.5, 0, width*0.5],
        })
      }]
    };
  } else {
    return {
      transform: [{
        translateX: xOffset.interpolate({
          inputRange: [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
          outputRange: [-width*0.5, 0, width*0.5],
        })
      }],
      paddingLeft:  xOffset.interpolate({
        inputRange: [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        outputRange: [-width*0.5, 0, width*0.5],
      })
    };
  }
}

export default class SboxProductDetialScrollView extends Component{
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps, nextState){
    if (Platform.OS != 'ios') return;
    if(nextProps.selectedPage !== this.props.selectedPage){
      this.refs.CardView.scrollTo({x:nextProps.selectedPage*width,y:0,animated:true})
    }
  }

  render() {
    if(Platform.OS === 'ios' ){
      const pages = this.props.page.map((page,key)=>{
        return (
          <Page key = {key} >
            <Card page={page} index={key} />
          </Page>
        )
      })
      return (
          <CardView ref="CardView"
                    onPageChange={this.props.onPageChange} onScroll={onScroll}
                    >
            {pages}
          </CardView>
      );
    }else{
      return(
        <View style={[style.card, ]}>
          <Image source={{uri: this.props.spu_image}}
                 style={{ width: width*0.446,
                          height: width*0.446*1.4043}}/>
        </View>
      )
    }


  }
}

const style = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  scrollPage: {
    width: SCREEN_WIDTH,
  },
  card: {
    height: height*0.3840,
    width:200,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
