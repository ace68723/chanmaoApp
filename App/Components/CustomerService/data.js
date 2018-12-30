/*
Type Options
{
  key: key,
  title: title,
  type: "options",
  options: [...]
}

Type Message
{
  key: key,
  title: title,
  type: "message",
  message: message
}

Type Content
{
  key: key,
  title: title,
  type: "content",
  content: content
}

Type Other - With custom logic *Use with Caution*
{
  key: key,
  title: title,
  type: "other",
}

*/

// Unfinished order options
let updateOrderOptions = [
  {
    key: "updateShippingAddress",
    title: "更改我的配送地址",
    type: "message",
    message: "问题：修改订单-更改我的配送地址"
  },
  {
    key: "updateContactInfo",
    title: "更改我的联系方式",
    type: "message",
    message: "问题：修改订单-更改我的联系方式"
  },
  {
    key: "updateOrderContent",
    title: "更改订单的内容",
    type: "message",
    message: "问题：修改订单-更改订单的内容"
  },
  {
    key: "updateOrderOthers",
    title: "其他",
    type: "message",
    message: "问题：修改订单-其他"
  },
]

let unfinishedOptions = [
  {
    key: "updateOrder",
    title: "我想更改订单地址、联系方式或餐点",
    type: "options",
    options: updateOrderOptions
  },
  {
    key: "rushOrder",
    title: "我想催单",
    type: "other",
  },
  {
    key: "paymentIssues",
    title: "订单支付有问题",
    type: "message",
    message: "问题：订单支付有问题"
  }
]

// Finished order options
let orderIssueOptions = [
  {
    key: "missingOrder",
    title: "少餐、错餐",
    type: "message",
    message: "问题：订单有问题-少餐、错餐"
  },
  {
    key: "foodIssues",
    title: "食品有问题（如有异物、过期变质）",
    type: "message",
    message: "问题：订单有问题-食品有问题（如有异物、过期变质）"
  },
  {
    key: "packageIssue",
    title: "包装漏洒",
    type: "message",
    message: "问题：订单有问题-包装漏洒"
  },
]

let finishedOptions = [
  {
    key: "orderIssue",
    title: "订单有问题",
    type: "options",
    options: orderIssueOptions
  },
  {
    key: "refundRelated",
    title: "退款相关",
    type: "message",
    message: "问题：退款相关"
  },
  {
    key: "orderRecepit",
    title: "申请订单收据",
    type: "message",
    message: "问题：申请订单收据"
  },
  {
    key: "complaint",
    title: "投诉",
    type: "message",
    message: "问题：投诉"
  }
]




export const Options = {
  cmEat: {unfinishedOptions, finishedOptions}
};

export default Options;
