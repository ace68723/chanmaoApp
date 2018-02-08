

## 从旧数据表构建新schema下的数据表过程

* 1. 构建sbox_sku_base

```
insert into `sbox_sku_base` (`sku_id`, `spu_id`, `name`, `alias`, `fullname`, `status`, `updated_at`, `updated_by`)
SELECT  pbid, pmid, attr1, alias, fullname, status*9, updated_at, updated_by from sb_prod_base;
```
  
* 2. 构建sbox_sku_core

```
insert into sbox_sku_core (`sku_id`, `original_price`, `price`, `amount`, `threshold`, `updated_at`, `updated_by`)
SELECT pbid, price as original_price, price, amount, threshold, updated_at, updated_by from sb_prod_core;
```

* 3. 构建sbox_spu

```
insert into sbox_spu (`spu_id`, `name`, `image_id`, `price`, `status`, `updated_at`, `updated_by`)
SELECT `pmid`, `name`, 0, 0, `status`*9, `updated_at`, `updated_by` from sb_prod_master;
```

* 4. 更新sbox_spu中的price字段为非缺货/下线状态下sku price的最小值

```
UPDATE
  `sbox_spu`
INNER JOIN
  (
  SELECT
    sbox_sku_base.spu_id,
    MIN(price) AS newprice
  FROM
    sbox_sku_base
  JOIN
    sbox_sku_core ON sbox_sku_base.sku_id = sbox_sku_core.sku_id
  WHERE
    sbox_sku_base.status = 0
  GROUP BY
    sbox_sku_base.spu_id
) i ON i.spu_id = sbox_spu.spu_id
SET
  price = i.newprice;
```

* 5. 更新sbox_spu中的status字段

```
UPDATE
  `sbox_spu`
INNER JOIN
  (
  SELECT
    sbox_sku_base.spu_id,
    MIN(status) AS newstatus
  FROM
    sbox_sku_base
  GROUP BY
    sbox_sku_base.spu_id
) i ON i.spu_id = sbox_spu.spu_id
SET
  status = i.newstatus;
```

* 6. 构建sbox_image

  * 6.1 先插正面图片
```
insert into `sbox_image` (`image_id`, `url`)
select id, image from sb_prod_image;
```
  * 6.2 检查图片id范围，假设在[1,200)之内
```
ASSERT(max(sbox_image.image_id)<200)!!!!!
```
  * 6.3 再插成分表图片
```
insert into `sbox_image` (`image_id`, `url`)
select pbid+200, facts from sb_prod_base;
```

* 7. 构建sbox_sku_image
```
insert into `sbox_sku_image` (`sku_id`, `image_id`, `fact_image_id`, `updated_at`, `updated_by` )
select pbid, sb_prod_image.id, pbid+200, sb_prod_base.updated_at, 1 from sb_prod_base
left join sb_prod_image on sb_prod_image.pmid = sb_prod_base.pmid and sb_prod_image.attr1 = sb_prod_base.attr1;
```

* 8. 更新spu中的image id为sku id中的一个
```
UPDATE
  `sbox_spu`
INNER JOIN
  (
  SELECT
    sbox_sku_base.spu_id,
    MIN(image_id) AS newimage_id
  FROM
    sbox_sku_base
  LEFT JOIN sbox_sku_image ON sbox_sku_image.sku_id = sbox_sku_base.sku_id
  GROUP BY
    sbox_sku_base.spu_id
) i ON i.spu_id = sbox_spu.spu_id
SET
  image_id = i.newimage_id;
```

* 9. 构建sbox_addr_base

```
insert into sbox_addr_base (`abid`, `uid`, `addr`, `province`, `lat`, `lng`, `name`, `unit`, `tel`, `status`, `updated_at`)
SELECT ab.abid, ab.uid, cb.addr,cb.province,cb.lat,cb.lng,ab.name, ab.unit,ab.tel,ab.status,0 from sb_addr_base as ab join sb_condo_base as cb on ab.cbid=cb.cbid;
```
