import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

export default class HomeCell extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.cardStyle}>
        <Image style={styles.backgroundImage} source={this.props.backgroundImage}/>
          <TouchableOpacity onPress={() => this.props.onPressedCell(this.props.key)} style={{flexDirection: 'column', position: 'absolute', flex: 1, top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center',}}>
            <Image style={styles.icon} source={this.props.icon} />
            <Text style={{fontWeight: '900', fontSize: 18, color: "white", textAlign: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 8}}> {this.props.title} </Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
