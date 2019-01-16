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

Type Url
{
  key: key,
  title: title,
  type: "url",
  url: url
}

*/

// Unfinished order options
const updateOrderOptions = [
  {
    key: "updateShippingAddress",
    title: "更改我的配送地址",
    type: "message",
    message: "你好，我想更改我的配送地址，我的新地址是："
  },
  {
    key: "updateContactInfo",
    title: "更改我的联系方式",
    type: "message",
    message: "你好，我想更改我的联系方式，我的新联系方式是："
  },
  {
    key: "updateOrderContent",
    title: "更改订单的内容",
    type: "message",
    message: "你好，我想更改订单的内容"
  },
  {
    key: "updateOrderOthers",
    title: "其他",
    type: "message",
    message: "你好，我想更改其他订单相关的信息"
  },
]

const unfinishedOptions = [
  {
    key: "updateOrder",
    title: "我想更改订单地址、联系方式或餐点",
    type: "options",
    options: updateOrderOptions
  },
  // {
  //   key: "rushOrder",
  //   title: "我想催单",
  //   type: "other",
  // },
  {
    key: "paymentIssues",
    title: "订单支付有问题",
    type: "message",
    message: "你好，我的订单支付有问题"
  }
]

// Finished order options
const orderIssueOptions = [
  {
    key: "missingOrder",
    title: "少餐、错餐",
    type: "message",
    message: "你好，我的订单有问题-少餐、错餐"
  },
  {
    key: "foodIssues",
    title: "食品有问题（如有异物、过期变质）",
    type: "message",
    message: "你好，我的订单有问题-食品有问题（如有异物、过期变质）"
  },
  {
    key: "packageIssue",
    title: "包装漏洒",
    type: "message",
    message: "你好，我的订单有问题-包装漏洒"
  },
]

const refundIssueOptions = [
  {
    key: "requestRefundReceipt",
    title: "申请提供退款receipt",
    type: "message",
    message: "你好，我想申请提供退款receipt，我的邮箱地址是："
  },
  {
    key: "refundSettleTime",
    title: "退款到账要多久?",
    type: "alert",
    alert: "信用卡、借记卡、Apple Pay退款到账时间大约在三个工作日后，支付宝退款到账时间大约在一个工作日后"
  },
  {
    key: "other",
    title: "其他",
    type: "message",
    message: "你好，我想询问退款相关的事情"
  },
]

const finishedOptions = [
  {
    key: "orderIssue",
    title: "订单有问题",
    type: "options",
    options: orderIssueOptions
  },
  {
    key: "refundRelated",
    title: "退款相关",
    type: "options",
    options: refundIssueOptions
  },
  {
    key: "orderRecepit",
    title: "申请订单收据",
    type: "message",
    message: "你好，我想申请订单收据，我的邮箱地址是："
  },
  {
    key: "complaint",
    title: "投诉",
    type: "message",
    message: "你好，我想投诉，具体情况是："
  }
]

const paymentRelatedOptions = [
  {
    key: "paymentRelatedUnplacedOrder",
    title: "我未能成功下单",
    type: "message",
    message: "你好，我想询问订单支付相关的问题"
  },
  {
    key: "paymentRelatedPlacedOrder",
    title: "我已成功下单，选择有问题的订单",
    type: "custom",
  },
]

const settingsOptions = [
  {
    key: "chatHistory",
    title: "历史记录",
    type: "other",
  },
  {
    key: "orderGuide",
    title: "馋猫订餐下单流程",
    type: "url",
    url: "https://mp.weixin.qq.com/s/ti6XkIXMo_5sTRYXp6MTNA"
  },
  {
    key: "couponGuide",
    title: "如何使用优惠码",
    type: "url",
    url: "https://mp.weixin.qq.com/s/dlF0Q3epnooDdvgHECBuXA"
  },
  {
    key: "paymentIssues",
    title: "订单支付相关",
    type: "options",
    options: paymentRelatedOptions
  },
  {
    key: "otherIssues",
    title: "其他",
    type: "message",
    message: ""
  }
]

export const Options = {
  cmEat: {unfinishedOptions, finishedOptions, settingsOptions}
};

export default Options;
