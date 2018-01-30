'use strict';
const Realm               = require('realm');
//=============================
//              new
//=============================
const sbox_cart_scheam = {
  name: 'sbox_cart',
  primaryKey: 'sku_id',
  properties: {
   sku_id:'int',
   spu_id:'int',
   sku_status:'int',
   spu_name:"string",
   sku_name:"string",
   sku_amount:'int',
   sku_quantity:'int',
   sku_original_price:'string',
   sku_price:'string',
   sku_image_url:'string'
  }
}


let realm
export function DatabaseInit() {
  realm = new Realm({
      path: 'sbox_1.1.0.realm',
      schema: [
                sbox_cart_scheam
              ],
      schemaVersion: 1,
  })
  console.log(realm.path)
}
export function sbox_getAllItemsFromCart() {
  return realm_sbox.objects('sbox_cart');
}
export function sbox_addItemToCart(io_data) {
  const sku_id = io_data.sku_id
  const spu_id = io_data.spu_id
  const sku_status = io_data.sku_status
  const spu_name = io_data.spu_name
  const sku_name = io_data.sku_name
  const sku_amount = io_data.sku_amount
  const sku_quantity = io_data.sku_quantity
  const sku_original_price = io_data.sku_original_price
  const sku_price = io_data.sku_price
  const sku_image_url = io_data.sku_image_url
  const data ={
    sku_id,
    spu_id,
    sku_status,
    spu_name,
    sku_name,
    sku_amount,
    sku_quantity,
    sku_original_price,
    sku_price,
    sku_image_url
  }
  realm.write(() => {
    realm.create('sbox_cart',Object.assign({},data),true);
  })

}
export function sbox_getCartQuantity() {
  let totalQuantity = 0;
  const totalItems = realm.objects('sbox_cart');
  if (totalItems.length === 0) return totalQuantity

  totalItems.forEach((item) => {
    totalQuantity += item.sku_quantity
  })
  return totalQuantity;
}
