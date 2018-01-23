## Header component

### Import
```javascript
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Separator from "./separator";每一个section的分割线
import Checkbox from "./checkbox";每一个row里面的checkbox组件
import ModalDropdown from 'react-native-modal-dropdown';
```



### 常量
从`props`提取`locationOptions`
从`Dimensions`得到当前窗口的高度跟宽度
根据比例，`navigationHeight`为总高度的`0.096`再减去ios的顶端bar高度`17`
后退按钮的`paddingLeft`为总宽度的`0.03`
```javascript
const { locationOptions } = this.props;
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const navigationHeight = viewHeight * 0.096 - 17;
const backPaddingLeft = viewHeight * 0.03;
```



### 渲染

Main body分为三部分，`navigation`，`filter`和`announcement`

```javascript
<View style={styles.container}>
		<View style={styles.navigation}>
			...
		</View>

        <Separator/>

        <View style={styles.filter}>
        	...
        </View>

        <Separator/>

        <View style={styles.announcement}>
        	...
        </View>

        <Separator/>
</View>
```



### Navigation

`navigation`分为左右三个部分`back`和`Title`还有一个目前为空的部分
`back`为一个`View`包含着一个`TouchableOpacity`, 里面再包含`Text`
`title`为一个`View`包含着一个`Text`

```javascript
<View style={styles.navigation}>
	<View style={styles.back}>
		<TouchableOpacity>
    		<Text>Back</Text>
    	</TouchableOpacity>
	</View>
	<View style={styles.title}>
		<Text>地址</Text>
	</View>
	<View style={{flex:1}}>
    </View>
</View>
```



### Filter

`filter`分为一个`dropDownBox`和搜索地址, 中间由分割线隔开
`dropDownBox`从`locationOptions`提取所有选项, 默认设定为`Select City`

```javascript
<View style={styles.filter}>
	<View style={styles.changeCity}>
		<ModalDropdown
			options={locationOptions}
				defaultValue="Select City"
				onSelect={(idx, filter) => this.props.onFilter(idx, filter)}
		/>
    </View>

    <View style={{width: 1, borderWidth: 0.4,
    	borderColor: "#D5D5D5"}}/>

    <View style={styles.search}>
    	<TouchableOpacity>
        	<Text>搜索地址</Text>
        </TouchableOpacity>
    </View>
</View>
```
