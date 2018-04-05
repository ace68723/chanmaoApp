import React,{ Component } from 'react';
import ReactNative from 'react-native';
import {
  Dimensions,
  Image,
  InteractionManager,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
} from 'react-native';
import Button from './Button';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../fontConfig.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const deviceWidth = Dimensions.get('window').width;
const {width,height} = Dimensions.get('window');

let _tabTop, tabBarInputRange, tabBarOutputRange;
if(height == 812){
  //min 34
  _tabTop = 88 + 200;
  tabBarInputRange = [0, _tabTop-88];
  tabBarOutputRange = [_tabTop, 88];
}else{
  _tabTop = 54+200;
  tabBarInputRange = [0, _tabTop-54];
  tabBarOutputRange = [_tabTop, 54];
}


class DefaultTabBar extends Component {
  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);
    this.state= {
      homeIconTop: new Animated.Value(50),
    }
  }
  componentWillReceiveProps(props){
    const page = props.activeTab
    if( this.refs['tabBtn'+page]){
      this.refs['tabBtn'+page].measure((ox, oy, width, height, px, py) => {
          if(ox>deviceWidth/2){
            this.tabScrollView.scrollTo({x: ox - deviceWidth/2+width/2 ,animated:true});
          }else{
            this.tabScrollView.scrollTo({x: 0 ,animated:true});
          }
      });
    }
  }
  renderTabOption(name, page) {
  }
  handleTabPress(page){
    this.props.goToPage(page)
  }
  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';


    if(page == 0){
      const iconName = 'cm-home_page';
      // if(!isTabActive && this.state.homeIconTop._value == 50){
      //   InteractionManager.runAfterInteractions(() => {
      //     Animated.timing(          // Uses easing functions
      //       this.state.homeIconTop,    // The value to drive
      //       {toValue: -2,
      //        duration: 600,
      //       }            // Configuration
      //     ).start();
      //   });
      //
      // }else if(isTabActive && this.state.homeIconTop._value == -2){
      //   InteractionManager.runAfterInteractions(() => {
      //     Animated.timing(          // Uses easing functions
      //       this.state.homeIconTop,    // The value to drive
      //       {toValue: 50,
      //        duration: 600,
      //       }            // Configuration
      //     ).start();
      //   });
      // }
      //   <Animated.View style={{top:this.state.homeIconTop}}>
      //  </Animated.View>
      return (
        <Button
            style={{flex: 1, marginLeft:10, marginRight: 25 }}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
          >
            <View style={[styles.tab, this.props.tabStyle,{flexDirection:'row',alignItems:'center'} ]}>
                <Icon style={{top:-2}} name={iconName} size={25} color={textColor} />
              <Text style={[{color: textColor, fontWeight, }, textStyle,]}
                    allowFontScaling={false}>
                {name}
              </Text>
            </View>
        </Button>
      );
    }else{
      return (
          <View key={name} ref={"tabBtn"+page}>

            <Button
                style={{flex: 1, marginRight:25, height:45 }}
                accessible={true}
                accessibilityLabel={name}
                accessibilityTraits='button'
                onPress={() => onPressHandler(page)}>
              <View style={[styles.tab, this.props.tabStyle, ]}>
                <Text style={[{color: textColor, fontWeight, }, textStyle, ]}
                      allowFontScaling={false}>
                  {name}
                </Text>
              </View>
            </Button>
            </View>
          )
    }
    // this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});

  }

  render() {
    return (
      <View style={{
          height:1,
          width:deviceWidth,
          position:"absolute",
          justifyContent:'center',
          alignItems:'center'}}
      />
    );
  }
}


DefaultTabBar.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

export default DefaultTabBar;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    // alignItems:'center',
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
  },
});
