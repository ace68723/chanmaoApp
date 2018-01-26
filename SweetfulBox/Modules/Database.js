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
   spu_name:"string",
   sku_name:"string",
   sku_status:'int',
   sku_amount:'int',
   sku_original_price:'string',
   sku_price:'string',
   sku_quantity:'int',
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
export function sbox_addItemsQuantityFromCart(sku_id) {
  return realm_sbox.objects('sbox_cart');
}
