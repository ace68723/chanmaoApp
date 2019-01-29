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
// import Common from '../../Constants/Common'

export default class AboutContact extends Component{
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
              <Image style={styles.icon} source={this.props.icon} />
              <Text allowFontScaling={false} style={{fontFamily:'NotoSans-Regular',fontWeight: '700', fontSize: 14, marginLeft: 10, color: "#4D4D4D"}}> {this.props.title} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 18,
    marginRight: 18,

  },
  icon: {
    width: 24,
    height: 24,
  }
});
