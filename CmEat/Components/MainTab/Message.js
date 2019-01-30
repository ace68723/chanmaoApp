/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  FlatList
} from 'react-native';

const {width,height} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';
export default class Message extends Component {
  constructor(props) {
    super(props);
    // this.state = HomeStore.getState();
    // this._renderProduct = this._renderProduct.bind(this);
    // this._onChange = this._onChange.bind(this);
    // this._addItem = this._addItem.bind(this);
    // this._removeItem = this._removeItem.bind(this);
    // this.updateQuantity = this.updateQuantity.bind(this);
    // this._goToCheckout=this._goToCheckout.bind(this);
    // this.renderNavigationBar=this.renderNavigationBar.bind(this);
    // this._goBack=this._goBack.bind(this);
    //
    // this.popupView = PopupView.getInstance();
    this.renderCategoryTabs=this.renderCategoryTabs.bind(this);
  }
  componentDidMount()
  {
    console.log(this.props);
    for (let i=0;i<this.props.message.length;i++)
    {
      console.log('messagelist: '+this.props.message[i].content);
    }
  }
  _renderMessage({item}){
    let date=new Date(item.messageid);
    let formatted = (date.getFullYear()) + "/" + (date.getMonth()+1) + "/" + date.getDate();
    console.log('timeconv: '+date);
    return(
      <View style={{width:0.9*width,height:0.12*height,marginTop:10,backgroundColor:'white',padding:5}}>
        <View style={{width:0.9*width,height:0.07*height,marginTop:0,}} >
          <Text style={{padding:5,fontSize:17,}}>
            {item.content}
          </Text>

        </View>
        <View style={{width:0.85*width,height:0.03*height,}}>
          <Text style={{padding:5,fontSize:15,textAlign:'right',color:'808285',marginBottom:5,}}>
            {formatted}
          </Text>
        </View>
      </View>
    )
  }
  renderCategoryTabs(){
    const categories = [
      {"name": '系统通知', 'cid': 0},
      {"name": '个人消息', 'cid': 1},

    ]
    let content = [];
    for (i of categories){
      content.push(
        <Animated.View key={i.cid}
                       tabLabel={i.name}
                       style={{flex: 1,backgroundColor:'#f4f4f4',alignItems:'center'}}>
                       <FlatList
                         scrollEventThrottle={1}
                         ref={(comp) => this._scrollVew = comp}
                         onEndReached={this._onEndReached}
                         onEndReachedThreshold={0.3}
                         data={this.props.message.filter(message=>message.type==i.cid)}
                         renderItem={this._renderMessage}
                         getItemLayout={(data, index) => ({ length: 250, offset: 250 * index, index})}
                         numColumns={1}
                       />
        </Animated.View>
      )
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#f4f4f4'}}>
        <ScrollableTabView
          style={{height: 40,marginTop:10}}
          tabBarBackgroundColor={'#f4f4f4'}
          tabBarActiveTextColor={'#2ad3be'}
          tabBarUnderlineStyle={{backgroundColor: '#2ad3be', height: 2, width: 0.4*width, marginLeft: 25}}
          tabBarTextStyle={{ fontSize: 14, top: 5, fontWeight: '700'}}
          tabBarInactiveTextColor={'#666666'}
          initialPage={1}
          prerenderingSiblingsNumber={3}
          tabBarPosition={'top'}
          ref={(scrollView) => {this.scrollView = scrollView}}
          contentProps={{ keyboardDismissMode: "on-drag", keyboardShouldPersistTaps: 'always'}}>
          {content}
        </ScrollableTabView>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderCategoryTabs()}
        <TouchableWithoutFeedback onPress={()=>{this.props.navigator.dismissModal()}}>
          <View style={{position:'absolute',
                        left:10,
                        top:25,
                        }}>
            <Image
              source={require('./Images/icon_back.png')}
                     style={{
                             position:'absolute',
                             height:20,
                             width:20,}}/>
          </View>

        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
