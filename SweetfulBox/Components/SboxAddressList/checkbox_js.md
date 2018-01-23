## Checkbox component

### Import
```javascript
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
```



### 常量

从`props`里提取`selected`
从`Dimensions`得到当前窗口的宽度
`checkbox`的宽度为当前窗口宽度的`0.065`

```javascript
const { selected } = this.props;
const viewWidth = Dimensions.get('window').width;
const checkboxWidth = viewWidth * 0.065;
```



### 渲染

用`style`渲染出一个空心的正方形, 当`selected`的值为`true`的时候, 正方形填充红色,否则为白色

```javascript
<View style={[styles.checkbox, selected && styles.selected,
	{width: checkboxWidth, height: checkboxWidth}]}>
</View>
```
