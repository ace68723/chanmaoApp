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

export default class Cell extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props)
    return (
      <View>
        <View style={this.props.cardStyle}>
          <View style={styles.content}>
            <TouchableOpacity onPress={() => this.props.onPressedCell(this.props.type)} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text allowFontScaling={false} style={{fontFamily:'NotoSans-Regular',fontWeight: '500', fontSize: 13, marginLeft: 10, }}> {this.props.title} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'red',
    height: 32,
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    width: 24,
    height: 24,
  }
});
