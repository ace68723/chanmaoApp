## 2018-01-30 update
-  表sb_order_base 重命名为sbox_order_base

## 2018-01-29 update
-  新增表sbox_addr_base 替换旧表sb_addr_base，移除cbid字段

##  database schema 

| Table              |            |                |                |                  |            |            |            |            |      |        |            |
| ------------------ | ---------- | -------------- | -------------- | ---------------- | ---------- | ---------- | ---------- | ---------- | ---- | ------ | ---------- |
| sbox_spu           | spu_id     | name           | image_id       | price            |            | status     | updated_at | updated_by |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_sku_base      | sku_id     | spu_id         | name           | alias            | fullname   | status     | updated_at | updated_by |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_sku_core      | sku_id     | original_price | price          | amount           | threshold  | updated_at | updated_by |            |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_sku_image     | sku_id     | image_id       | fact_image_id  | updated_at       | updated_by |            |            |            |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_image         | image_id   | url            |                |                  |            |            |            |            |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_section       | section_id | name           | icon_id        |                  | status     | updated_at | updated_by |            |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_section_sku   | section_id | sku_id         | rank           | status           | updated_at | updated_by |            |            |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_section_spu   | section_id | spu_id         | rank           | status           | updated_at | updated_by |            |            |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_theme         | theme_id   | name           | active_icon_id | inactive_icon_id | rank       | status     | updated_at | updated_by |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_theme_section | theme_id   | section_id     | rank           | status           | updated_at | updated_by |            |            |      |        |            |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_addr_base     | abid       | uid            | addr           | province         | lat        | lng        | name       | unit       | tel  | status | updated_at |
|                    |            |                |                |                  |            |            |            |            |      |        |            |
| sbox_order_base    | obid       | uid            | abid           | pretax           | delifee    | total      | ptype      | created   | status |      | updated_at |

