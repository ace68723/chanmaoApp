
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

  renderTab(name, page, isTabActive, onPressHandler,activeIconImage,inactiveIconImage) {

    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const iconImage = isTabActive ? activeIconImage : inactiveIconImage;
    const iconText = page === 1 ? this.state.totalQuantity : "";
    return (
      <TouchableOpacity
        key={page}
        style={{flex: 1, padding: 15}}
        onPress={() => this.props.goToPage(page)}>
        <Text style={{textAlign: 'center', color: textColor, fontFamily:'FZZhunYuan-M02S'}}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    let numberOfTabs;
    if (this.props.tabs.length == 0) {
      numberOfTabs = 1;
    }
    numberOfTabs = this.props.tabs.length;
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
          const activeIconImage = this.props.activeIconImages[page];
          const inactiveIconImage = this.props.inactiveIconImages[page];
          return renderTab(name, page, isTabActive, this.props.goToPage,activeIconImage,inactiveIconImage);
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
