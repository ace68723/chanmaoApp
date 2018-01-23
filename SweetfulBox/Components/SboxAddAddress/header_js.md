## Header

### Import

```react
import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity,} from 'react-native';
```

### Constant

用于限制内容高度、宽度

```const { height, width } = Dimensions.get(&#39;window&#39;); 限制内容长宽
const { height, width } = Dimensions.get('window');
```

### Render

将整个Header区域划分为左(cancle button)，中(header name)，右(用于格式控制)

```react
<View style={styles.container}>
  <TouchableOpacity style={styles.left}>
    <Text style={styles.cancleIcon} {String.fromCharCode(10005)}</Text>
  </TouchableOpacity>
  <Text style={styles.headTitle}>添加地址</Text>
  <View style={styles.right}/>
</View>
```

