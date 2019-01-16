import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import HomeHeader from './HomeHeader'
import HomeCell from './HomeCell'
import BaseComponent from '../Common/BaseComponent'

const {width,height} = Dimensions.get('window');
export default class Home extends BaseComponent {
  constructor(props) {
    super(props);
    const cellsData = [
      {
        icon: require("./Image/washing-icon.png"),
        title: "馋猫干洗",
        key: "washing",
        backgroundImage: require("./Image/washing-background.png"),
      },
      {
        icon: require("./Image/washing-icon.png"),
        title: "卡包",
        key: 'ewallet',
        backgroundImage: require("./Image/coming_soon.png"),
      },
      {
        icon: null,
        title: "",
        key: "2",
        backgroundImage: require("./Image/coming_soon.png"),
      },
    ]
    this.state = {
      cells: cellsData
    };
    this.renderCells=this.renderCells.bind(this);
    this.onPressedCell=this.onPressedCell.bind(this);
    this._backToHome=this._backToHome.bind(this);

  }
  componentDidMount() {
    if (this.props.goToCmLife == 'cmwash') {
      setTimeout(() => {
        this.onPressedCell('washing');
      }, 800);
    }
  }
  _backToHome() {
    this.props.navigator.resetTo({
        screen: 'cmHome',
        animated: true,
        animationType: 'fade',
        navigatorStyle: {navBarHidden: true},
      });
  }
  onPressedCell(key){
    switch (key) {
      case "washing":
        this.props.navigator.push({
          screen: 'CmLifeMainTab',
          navigatorStyle: {navBarHidden: true},
          passProps:{
            fromPage:0,
          }
        })
        break;
      case "ewallet":
        this.props.navigator.push({
          screen: 'EwalletMainTab',
          navigatorStyle: {navBarHidden: true},
          passProps:{
            fromPage:0,
          }
        })
      default:

    }
  }
  renderCells(item) {
    return (<HomeCell
      keyNum={item.key}
      cardStyle={styles.card}
      title={item.title}
      icon={item.icon}
      backgroundImage={item.backgroundImage}
      onPressedCell={this.onPressedCell}
    />)
  }
  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <HomeHeader goBack={this._backToHome} />
        <View style={styles.container}>
          <FlatList style={{marginTop: 6}}
                    data={this.state.cells}
                    renderItem={({item}) => (this.renderCells(item))}/>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 0.27*height,
    width: this.mScreenWidth,
    overflow: 'hidden'
  },
});
