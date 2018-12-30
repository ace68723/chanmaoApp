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
        <View style={this.props.cellStyle}>
          <View style={styles.content}>
            <TouchableOpacity onPress={() => this.props.onPressedCell(this.props.cellKey)} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text allowFontScaling={false} style={{fontFamily:'NotoSans-Regular',fontWeight: '500', fontSize: 13, marginLeft: 10, color: "#393947"}}> {this.props.title} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    height: 32,
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 0.7,
    borderColor: '#CCCCD3',
  },
  icon: {
    width: 24,
    height: 24,
  }
});
