## Row component

### Import
```javascript
import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Dimensions} from "react-native";
import Checkbox from "./checkbox"; Row里面的Checkbox组件
```



### shouldComponentUpdate
只重新render state有改变的`Row`
```javascript
shouldComponentUpdate(nextProps, nextState){
	if(nextProps.selected != this.props.selected){
		return true
	}
  	else{
		return false
	}
}
```



### 常量

从`props`里提取`selected`
从`Dimensions`得到当前窗口的高度和宽度
默认`addr`有4项由`,`分隔, 其中没有空格
根据`,`把`addr`分隔开来存储到`str1`, 然后重新添加空格,逗号和换行,组合在一起

```javascript
var { selected } = this.props;
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const rowHeight = viewHeight * 0.11;
const checkboxWidth = viewWidth * 0.07;
const str1 = this.props.addr.split(',');
const locationText = str1[0] + ", " + str1[1] + ",\n"
			+ str1[2] + ", "+ str1[3];
```



### 渲染

`Row`分为左右两个部分`Checkbox`和`locationText`
当用户选中该`Row`的时候, 改变该`Row`的`selected`值为`true`, 其他`Row`的`selected`的值为`false`
并改变该`Row`的背景颜色为灰色, `Checkbox`填充红色
其他`Row`的背景颜色为白色, `Checkbox`填充白色


```javascript
<TouchableOpacity onPress={() => (this.props.onselected(this.props.selected))}>
	<View style={[styles.container, selected && styles.selected,
					{height: rowHeight}]}>
		<View>
			<Checkbox style={{alignSelf: 'center'}}
				{...this.props}
			/>
	    </View>

	    <View style={styles.textWrap}>
	    	<Text>{locationText}</Text>
	    </View>
	</View>
</TouchableOpacity>
```
