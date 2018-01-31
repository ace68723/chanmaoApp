
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
import SboxProductStore from '../../Stores/SboxProductStore';
import createReactClass from 'create-react-class';
import Button from './Button';
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
      SboxProductStore.addChangeListener(this._onChange);
      this.setState({
        totalQuantity: SboxProductStore.getTotalQuantity()
      })
  }
  componentWillUnmount() {
    SboxProductStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({
      totalQuantity: SboxProductStore.getTotalQuantity()
    })
  }
  renderTabOption(name, page) {
  }

  renderTab(name, page, isTabActive, onPressHandler,activeIconImage,inactiveIconImage) {

    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const iconImage = isTabActive ? activeIconImage : inactiveIconImage;
    const iconText = page === 2 ? this.state.totalQuantity : "";
    return (
      <Button
        style={{flex: 1, }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, this.props.tabStyle, ]}>
        <ImageBackground
                    style={{width:25,
                      height:27,
                      marginBottom:3,
                      backgroundColor:'transparent',
                       justifyContent: 'center',alignItems: 'center',}}
                    source={iconImage}>
                <Text style={{backgroundColor:'rgba(0,0,0,0)',fontFamily:'FZZhunYuan-M02S',}}>
                  {iconText}
                </Text>
          </ImageBackground>
          <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
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
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#D1D3D4',
  },
});
