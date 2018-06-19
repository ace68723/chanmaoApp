
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  ImageBackground
} from 'react-native';
// import SboxProductStore from '../../Stores/SboxProductStore';
// import SboxCartStore from '../../Stores/SboxCartStore';
import createReactClass from 'create-react-class';
// import Button from './Button';
export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQuantity:0
    }
    this.renderTab = this.renderTab.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
      // SboxCartStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    // SboxCartStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    // this.setState({
      // totalQuantity: SboxCartStore.getTotalQuantity()
    // })
  }
  // <Text style={{textAlign: 'center',
  //               color: textColor,
  //               fontWeight: fontWeight,
  //               fontFamily:'FZZhunYuan-M02S',
  //               marginRight: 5}}
  //       allowFontScaling={false}>
  //       {this.props.orderData.length}
  // </Text>

  renderTab(name, page, isTabActive, onPressHandler) {

    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const iconText = page === 1 ? this.state.totalQuantity : "";
    if (page == 1) {
      const iconColor = isTabActive ? activeTextColor : "rgba(0,0,0,0.4)";
      let numOfOrderNotReviewed = 0;
      for (let order of this.props.orderData) {
        if (order.order_review_status === 0 && order.order_status == 40) {
          numOfOrderNotReviewed++;
        }
      }
      return (
        <TouchableOpacity
          key={page}
          style={{flex: 1, padding: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
          onPress={() => this.props.goToPage(page)}>
          <View style={{width:24,
                        height:24,
                        padding: 5,
                        borderRadius:15,
                        backgroundColor:iconColor,
                        marginRight: 5,
                        justifyContent: 'center'}}>
            <Text style={{fontSize:15,
                          textAlign:"center",
                          color:"#ffffff",
                          fontFamily:'FZZhunYuan-M02S'}}
                  allowFontScaling={false}>
              {numOfOrderNotReviewed}
            </Text>
          </View>
          <Text style={{textAlign: 'center',
                        color: textColor,
                        fontWeight: fontWeight,
                        fontFamily:'FZZhunYuan-M02S'}}
                allowFontScaling={false}>
            {name}
          </Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity
        key={page}
        style={{flex: 1, padding: 15}}
        onPress={() => this.props.goToPage(page)}>
        <Text style={{textAlign: 'center',
                      color: textColor,
                      fontWeight: fontWeight,
                      fontFamily:'FZZhunYuan-M02S'}}
              allowFontScaling={false}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    let numberOfTabs = 1;
    if (!this.props.tabs) {
      numberOfTabs = 1;
    }
    else if(this.props.tabs.length == 0) {
      numberOfTabs = 1;
    }
    else {
      numberOfTabs = this.props.tabs.length;
    }
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs - 80,
      left: 40,
      height: 3,
      backgroundColor: 'navy',
      bottom: 0,
    };
    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ]
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#D1D3D4',
  },
});
