# 模型额外计费系数（ModelExtraRatio）

## 功能说明

为每个模型增加一个**额外计费系数**，在计算使用额度时将最终 quota 乘以该系数。

- **默认值**：1（不影响原有计费）
- **可见范围**：仅管理后台可见/可配置，普通用户不可见
- **配置入口**：管理后台 → 设置 → 倍率设置 → 模型额外系数

## 管理后台配置方法

1. 使用超级管理员账号（role ≥ 100）登录
2. 顶部导航点击 **设置**
3. 切换到 **分组与模型定价设置** 标签页
4. 在内部子标签页中点击 **模型倍率设置**（默认打开的是"价格设置"，需手动切换）
5. 向下滚动，找到 **模型额外系数** 输入框（位于"模型倍率"下方）
6. 输入 JSON 格式的系数配置，键为模型名称，值为系数（浮点数）
7. 点击 **保存模型倍率设置** 按钮

配置示例：

```json
{
  "gpt-4o": 1.5,
  "claude-3-5-sonnet-20241022": 2.0
}
```

表示使用 `gpt-4o` 时，实际扣费 = 正常计算额度 × 1.5。

**注意事项：**
- 系数必须为正数，设为 `1` 等同于不配置（不影响计费）
- 未配置的模型默认系数为 `1`
- 该字段仅在管理员登录后的设置页可见，普通用户无法查看或修改
- 支持通配符模型名（如 `gpt-4-gizmo-*`），与模型倍率命名规则一致

## 改动文件

### 后端

| 文件 | 改动内容 |
|---|---|
| `setting/ratio_setting/model_ratio.go` | 新增 `extraRatioMap` 变量及三个函数：`GetModelExtraRatio`、`UpdateModelExtraRatioByJSONString`、`ModelExtraRatio2JSONString` |
| `model/option.go` | OptionMap 初始化加入 `ModelExtraRatio`；switch-case 新增 `case "ModelExtraRatio"` 处理更新 |
| `relay/helper/price.go` | `ModelPriceHelper` 函数构建 PriceData 后注入 extra ratio，通过已有的 `OtherRatios` 乘法机制生效 |

### 前端

| 文件 | 改动内容 |
|---|---|
| `web/src/pages/Setting/Ratio/ModelRatioSettings.jsx` | inputs state 加入 `ModelExtraRatio`；在"模型倍率"下方新增 JSON 编辑区 |

## 技术实现

### 存储方式

与 `ModelRatio`、`ModelPrice` 相同，使用系统 Option 表存储：
- key: `ModelExtraRatio`
- value: JSON Map `{"model-name": float64}`

无需新建数据库表。

### 计费注入点

在 `relay/helper/price.go` 的 `ModelPriceHelper` 中，构建 PriceData 后：

```go
if extraRatio := ratio_setting.GetModelExtraRatio(info.OriginModelName); extraRatio != 1.0 {
    priceData.AddOtherRatio("extra_ratio", extraRatio)
}
```

`calculateTextQuotaSummary`（`service/text_quota.go`）中已有 `OtherRatios` 循环乘法逻辑，无需额外修改：

```go
for _, otherRatio := range relayInfo.PriceData.OtherRatios {
    quotaCalculateDecimal = quotaCalculateDecimal.Mul(decimal.NewFromFloat(otherRatio))
}
```

### 普通用户隔离

`GET /api/pricing` 返回的 `Pricing` struct 不包含 `ModelExtraRatio` 字段，天然隔离，无需额外处理。
