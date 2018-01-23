## Content

### Import

```react
import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions, Image, TouchableOpacity,} from 'react-native';
```

### Constant

用于限制内容高度、宽度

```react
const { height, width } = Dimensions.get('window');
```

### Render

`content`一共分为2个区域: 

	1. `info`: 用户地址信息，包含地址、联系人、电话、Unit No.
	2. `submit`: 提交按钮

```react
<View style={styles.content}>
  <View style={styles.info}> ... </View> 地址
  <View style={styles.info}> ... </View> 联系人
  <View style={styles.info}> ... </View> 电话
  <View style={styles.info}> ... </View> Unit No.
  <View style={styles.submit}> ... </View> 添加地址按钮
</View>
```

#### info

地址、联系人、电话、Unit No.皆用相似格式

下用地址为范例：

`maxLength = {13}` 仅限于phone number

`keyboardType={'phone-pad'}` 仅限于phone number

```react
<TextInput
  <View style={styles.image}><Image source={require('./img/address.png')}/></View>
  value={this.props.address}
  onChangeText={this.props.onAddressChange}
  // maxLength = {13}
  // keyboardType={'phone-pad'}
  placeholder="Address"
  returnKeyType="done"
  style={styles.input}
/>
```


