
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
import SboxCartStore from '../../Stores/SboxCartStore';
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
      SboxCartStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    SboxCartStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({
      totalQuantity: SboxCartStore.getTotalQuantity()
    })
  }

  renderTab(name, page, isTabActive, onPressHandler,activeIconImage,inactiveIconImage) {

    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const iconImage = isTabActive ? activeIconImage : inactiveIconImage;
    const iconText = page === 1 ? this.state.totalQuantity : "";
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
                    style={{width:27.6,
                      height:27,
                      marginBottom:3,
                      backgroundColor:'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',}}
                    source={iconImage}>
                <Text style={{backgroundColor:'rgba(0,0,0,0)',height: 13.5, fontFamily:'NotoSansCJKsc-Regular',}}
                      allowFontScaling={false}>
                  {iconText}
                </Text>
          </ImageBackground>
          <Text style={[{color: textColor, fontWeight, }, textStyle, ]}
                allowFontScaling={false}>
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
