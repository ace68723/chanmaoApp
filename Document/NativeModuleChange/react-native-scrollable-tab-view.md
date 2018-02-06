Index.js:Change all 'if (Platform.OS==='ios')' to 'if (Platform.OS)' 消除Scrollable嵌套在scrollView中出现的报错
备用修改方案：去除所有对平台判断 全部走IOS逻辑
报错原因：该模块对android平台自动使用ViewPagerAndroid（不能嵌套在ScrollView)
