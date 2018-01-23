## App

### Import

`Header`页面Header

`Content`页面Content

```react
import React, { Component } from 'react';
import { View, StyleSheet, Alert, } from 'react-native';
import Header from './header';
import Content from './content';
```

### Constructor

`address`:储存的地址，初始为空

`name`: 储存的姓名，初始为空

`phoneNumDisplay`: 储存的电话号码，初始为空

`unitNum`: 储存的Unit No.，初始为空

`addressInfo`: 储存所有用户地址信息，初始为空

```react
constructor(props) {
  super(props);
  this.state = {
    address: '',
    name: '',
    phoneNumDisplay: '',
    unitNum: '',
    addressInfo: [],
  };
  this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
```

### handlePhoneNumChange

当用户改变电话号码时，由此function对`value`进行修改并重新储存到state中的phoneNumDisplay，从而用户会看到排版完毕的电话号码。

`newValue`: `value`去除所有符号后的结果

第一段判断式: 

1. 若用户删除符号'-'，则删除'-'左边一位数字并赋给`newValue`
2. 若用户删除符号')'，则删除')'左边一位数字并赋给`newValue`
3. 若用户删除符号'('，则删除'('右边一位数字并赋给`newValue`

第二段判断式：

1. 若`newValue`的长度为4-6，则转化其格式为(xxx)xxx
2. 若`newValue`的长度为7-10，则转化其格式为(xxx)xxx-xxxx

最后由`setState`重新赋值给`phoneNumDisplay`从而展示排版后的电话号码给用户

```react
handlePhoneNumChange(value) {
  let newValue = value.replace(/[()-]/g, ''); 去除所有的符号并赋给newValue
  //第一段判断式
  if (value.indexOf('-') === -1 && this.state.phoneNumDisplay.indexOf('-') > -1 && newValue.length >= 7) { 如果用户删除'-'则删除'-'左边一位数字并赋给newValue
    newValue = newValue.slice(0, 5) + newValue.slice(6, 10);
  } else if (value.indexOf('(') > -1 && value.indexOf(')') === -1 && newValue.length >= 4) { 如果用户删除')'则删除')'左边一位数字并赋给newValue
    newValue = newValue.slice(0, 2) + newValue.slice(3, 10);
  } else if (value.indexOf('(') === -1 && value.indexOf(')') > -1 && newValue.length >= 4) { 如果用户删除'('则删除'('右边一位数字并赋给newValue
    newValue = newValue.slice(1, 10);
  }
  //第二段判断式
  if (newValue.length >= 4 && newValue.length <= 6) { 4-6位数字转化格式为(123)456
    newValue = newValue.replace(/(\d{3})(\d{1,3})/, '($1)$2');
  } else if (newValue.length >= 7 && newValue.length <= 10) { 7-10位数字转化格式为(123)456-7890
    newValue = newValue.replace(/(\d{3})(\d{3})(\d{1,4})/, '($1)$2-$3');
  }

  this.setState({ phoneNumDisplay: newValue });
    }
```

### handleSubmit

当用户点击“添加地址”按钮后，若必填项有空缺则弹出Alert，另则储存数据并重置填写项信息，同时提示用户提交成功

Alert：若地址、姓名、电话号码缺失则弹出Alert，并取消本次数据储存

`newAddressInfo`：在储存已有数据之后，储存新的用户地址信息

`setState`：重置地址、姓名、电话号码、Unit No.

```react
handleSubmit() {
        if (!this.state.address || !this.state.name || !this.state.phoneNum) {
            Alert.alert('错误', '请填写所有信息', { text: 'OK' });
            return;
        } 用户必须填写所有必填项才能提交
        const newAddressInfo = [
            ...this.state.addressInfo,
            {
                key: Date.now(),
                address: this.state.address,
                name: this.state.name,
                phoneNumDisplay: this.state.phoneNumDisplay,
                unitNum: this.state.unitNum,
            }
        ]; 生成新用户信息并合并已存信息
        this.setState({
            addressInfo: newAddressInfo,
            address: '',
            name: '',
            phoneNumDisplay: '',
            unitNum: '',
        })
        Alert.alert('成功', '信息已填交', { text: 'OK' });
    }
```

### Render

此处分为2部分：`<Header />`和`<Content />`

```react
<View style={styles.container}>
                <Header />
                <Content
                    address={this.state.address}
                    onAddressChange={(address) => this.setState({ address: address })}
                    name={this.state.name}
                    onNameChange={(name) => this.setState({ name: name })}
                    phoneNumDisplay={this.state.phoneNumDisplay}
                    onPhoneNumChange={this.handlePhoneNumChange}
                    unitNum={this.state.unitNum}
                    onUnitNumChange={(unitNum) => this.setState({ unitNum: unitNum })}
                    onSubmit={this.handleSubmit}
                />
            </View>
```

