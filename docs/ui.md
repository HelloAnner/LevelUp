# LevelUp · UI 设计

现代极简 · 冷色调 · 精确克制 · 有剧场感的交互
参照系：Linear · Vercel · Arc · Rauno Freiberg · Raycast · Family.co

---

## 0. 设计立场

LevelUp 不是传统管理系统。它是一块**冷光屏幕**——安静、高密度、精准，但在需要的时候会为你表演一段。

三条总则：

1. **Monochrome first**：整个产品只有冷灰 + 一种光
2. **Precision over decoration**：没有装饰元素，只有精确的比例和间距
3. **Motion as interface**：动效是界面的一部分，不是锦上添花

**不做什么**：
- ❌ 温暖感 · 手工感 · 纸质感 · 衬线字体
- ❌ 米白 · 米黄 · 琥珀 · 任何"温润"的色调
- ❌ 诗意文案 · 感性比喻
- ❌ 传统后台的表格、侧栏菜单、功能 Tab 树

**要做什么**：
- ✓ 冷灰、冷白、电光蓝
- ✓ 极致精准的 Inter / Geist
- ✓ 直接、简洁、精准的文案
- ✓ 对话驱动、手势驱动、键盘驱动

---

## 1. 设计气质

### 1.1 参照系

| 参照 | 借鉴 |
|:---|:---|
| **Linear** | 精准的间距 · 键盘优先 · 低饱和色彩 |
| **Vercel** | 极致的排版 · 黑白分明 · 几何简洁 |
| **Arc** | 玻璃质感 · 侧栏交互 · 现代感 |
| **Raycast** | 命令面板 · 细节打磨 · 快捷键文化 |
| **Rauno Freiberg** | 动效细节 · 微交互精度 |
| **Family.co** | 冷极简 + 戏剧性 onboarding |
| **Blade Runner 2049 UI** | 冷科技氛围 · 几何与留白 |

### 1.2 产品的"视觉人格"

冷静、精确、克制。像一台定制的工业设备，不像一本笔记本。

```
参照  ✓ Linear 的精准    ✗ Notion 的温暖
      ✓ Arc 的戏剧       ✗ Obsidian 的朴素
      ✓ Vercel 的黑白    ✗ Character.ai 的活泼
      ✓ 2049 的冷光      ✗ Swan Song 的居家感
```

### 1.3 关键词

```
✓ 精准 · 冷静 · 低饱和 · 高对比 · 几何 · 玻璃 · 电光
✗ 温暖 · 柔软 · 手工 · 自然 · 暖色 · 纸张 · 涂鸦
```

---

## 2. 色彩系统

### 2.1 哲学

**Monochrome + One light.** 整个产品只有灰阶和一种强调光。

### 2.2 亮色模式

```
/* Neutral · 冷灰阶 */
--bg-0     #FAFAFA   页面底层（极淡冷白）
--bg-1     #FFFFFF   升起的面
--bg-2     #F4F4F5   下沉的槽
--bg-glass rgba(255,255,255,0.72)  玻璃

--fg-0     #09090B   主文字（近黑，带冷调）
--fg-1     #52525B   次要文字
--fg-2     #A1A1AA   三级文字
--fg-3     #D4D4D8   占位符

--line-1   rgba(9,9,11,0.06)   发丝线
--line-2   rgba(9,9,11,0.10)   柔线

/* Accent · 唯一的光 */
--accent   #3B82F6   电光蓝（主强调）
--accent-glow rgba(59,130,246,0.24)  光晕

/* Signal */
--signal   #F97316   信号橙（唯一警告色，克制使用）
```

### 2.3 暗色模式（默认推荐）

```
--bg-0     #09090B   墨（页面底层）
--bg-1     #18181B   升起的面
--bg-2     #27272A   更升起
--bg-glass rgba(24,24,27,0.76)

--fg-0     #FAFAFA
--fg-1     #A1A1AA
--fg-2     #71717A
--fg-3     #52525B

--line-1   rgba(255,255,255,0.06)
--line-2   rgba(255,255,255,0.10)

--accent   #60A5FA   略亮的电光蓝
--accent-glow rgba(96,165,250,0.32)

--signal   #FB923C
```

### 2.4 色彩纪律

- 一屏只有 **一种强调色**（电光蓝），且只点在需要被看见的元素上
- 禁用：暖色 · 渐变色 · 彩虹色 · 品牌多色
- 背景永远是灰阶
- 绝对禁用 `#000` 纯黑和 `#FFF` 纯白

---

## 3. 字体系统

### 3.1 字体选择

| 用途 | 西文 | 中文 |
|:---|:---|:---|
| 界面主体 | **Inter** | 苹方 / 思源黑体 |
| 数字 | **Inter Tabular** | — |
| 代码 / mono | **JetBrains Mono** 或 **Geist Mono** | — |

**不用衬线体。不用手写体。不用系统默认。**

字体加载后再渲染（FOUT 而不是 FOIT）。

### 3.2 字号阶梯

```
display   56 / 64   tight   -0.03em   Onboarding 主字
h1        36 / 44   tight   -0.02em   里程碑数字
h2        24 / 32   -0.015em          目标标题
h3        18 / 26   -0.01em           卡片标题
body      14 / 22   -0.005em          正文 · 对话
small     13 / 20                     次要
caption   12 / 16   +0.02em UPPER     标签
```

**字重纪律**：
- Regular (400) — 正文
- Medium (500) — 强调
- Semibold (600) — 标题
- 不用 Bold 700，不用 Light 300

### 3.3 排版细节

- 所有标题用负字距（-0.01 ~ -0.03em），更现代
- 所有 caption / label 用正字距 +0.02em 并全大写
- 数字一律用 `tabular-nums`（等宽）
- 行距正文 1.6，标题 1.2

---

## 4. 间距 · 网格

### 4.1 8pt 网格

```
--sp-0   0
--sp-1   4
--sp-2   8
--sp-3   12
--sp-4   16
--sp-5   20
--sp-6   24
--sp-8   32
--sp-10  40
--sp-12  48
--sp-16  64
--sp-20  80
--sp-24  96
```

### 4.2 布局尺度

- 对话区最大宽度 **720 px**
- 卡片宽度 **560 px**
- Sidebar 折叠 **56 px** · 展开 **280 px**
- 顶栏高度 **48 px**
- 输入区高度 **56 px**

### 4.3 圆角

```
--r-xs   4     输入框 · 小标签
--r-sm   6     按钮
--r-md   8     卡片 · 消息气泡
--r-lg   12    浮层
--r-full 9999  点 · 头像
```

**现代极简不用大圆角**。最大 12 px。绝不用 16+。

---

## 5. 动效原理

### 5.1 时长

```
--t-fast    120ms    hover · press
--t-base    200ms    常规过渡
--t-mid     320ms    进出场
--t-slow    480ms    剧场切换
--t-breath  6s       呼吸循环
```

**注意**：没有 800ms / 1600ms 的史诗级动效。现代极简的动效是**精准快速**，而不是"表演"。

### 5.2 缓动

```
--ease-out   cubic-bezier(0.16, 1, 0.3, 1)      主力入场
--ease-in    cubic-bezier(0.7, 0, 0.84, 0)      离场
--ease-io    cubic-bezier(0.87, 0, 0.13, 1)     位移
--ease-spring cubic-bezier(0.5, 1.3, 0.5, 1)    极少数弹性（点击反馈）
```

### 5.3 动效纪律

1. **默认 200ms**，除非有明确理由更长
2. **没有弹跳**，最多一次 `settle`，过冲幅度 ≤3%
3. **入场快、离场更快**（离场 0.7× 入场时长）
4. **transform / opacity only**——永远不 animate width / height / top

---

## 6. 质感与层次

### 6.1 没有阴影（几乎）

层级靠三样东西：

1. **背景色阶差**（bg-0 → bg-1 → bg-2）
2. **细发丝线**（1px line-1）
3. **玻璃模糊**（backdrop-filter: blur(20px)）

唯一允许的阴影是浮层：
```
--shadow-pop  0 0 0 1px line-1, 0 16px 48px rgba(0,0,0,0.12);
```

### 6.2 玻璃

- Sidebar、顶栏、浮层使用 `backdrop-filter: blur(20px) saturate(1.5)`
- 背后有内容时才成立，空背景时用纯 bg-glass

### 6.3 噪声（可选）

- 在大面积 bg-0 上叠 0.012 不透明度的单色噪声
- 防止纯色看起来"数字感过强"
- 仅在暗模式启用

---

## 7. 核心动效库

### 7.1 呼吸背景（Ambient Halo）

Onboarding、空状态、迷失重锚时出现。

```
元素：单个 div · 绝对定位 · 全屏
内容：径向渐变  accent-glow 100% → transparent 70%
尺寸：200vmin × 200vmin
位置：屏幕中心
动效：
  opacity   0.4 ↔ 0.7       周期 6s    ease-io
  scale     1.0 ↔ 1.08      周期 6s    ease-io
  translate Perlin noise    周期 20s   linear
模糊：blur(80px)
```

### 7.2 字符流入（Text Stream）

AI 消息的打字效果——现代版，不是老式打字机。

```
方式：按单词而非字符（更现代）
每词进入：opacity 0 → 1 · blur 6px → 0 · Y 4 → 0 · 180ms · ease-out
词间延迟：60 ms
句末停顿：240 ms
光标：不显示（Linear 风格，没有 blinking cursor）
```

### 7.3 Command Bar 唤起（⌘K）

```
触发：⌘K
层级：
  1. 覆盖层 bg-glass + blur(12px) 从 0 → 1 · 200ms
  2. Command bar 从 屏幕中心 scale 0.96 → 1 · opacity 0 → 1 · 280ms · ease-spring
  3. 第一个结果项延迟 80ms 淡入
关闭：Esc · 反向 160ms · ease-in
```

### 7.4 卡片涌入（Card Push）

```
0–200ms   占位骨架出现（bg-2 色块）
200ms     内容淡入替换骨架
动效：     Y 12 → 0 · opacity 0 → 1 · 280ms · ease-out
进度条：   延迟 120ms 开始填充 · 800ms · ease-io
```

### 7.5 Sidebar 滑出

```
折叠 → 展开：
  width  56 → 280     320ms   ease-io
  blur   16px → 20px  320ms
  目标项依次出现 · stagger 30ms · 每项 opacity + X -8 → 0 · 200ms
```

### 7.6 进度轨迹

```
轨道：1px line-1
填充：1px accent
动效：
  width  oldVal → newVal    800ms · ease-io
  glow   延迟 400ms 时短暂 box-shadow 0 0 12px accent-glow · 600ms
完成态：进度 100% 时，整条轨道 opacity 1 → 0.4 · 400ms（回落到完成态）
```

### 7.7 里程碑完成

**现代版庆祝**：不要 confetti，不要竖琴。用**冷光一闪 + 精准停顿**。

```
0ms      当前卡片 scale 1 → 1.01 · 280ms · ease-out
200ms    屏幕边缘 1px accent 线圈淡入 → 向外扩散 → 淡出 · 800ms
400ms    卡片状态 dot 从 fg-2 变为 accent · 200ms
600ms    卡片内出现一行字（fade in）：  
          Milestone complete
          大写 · tracking +0.05em · accent 色 · 11px
1200ms   卡片 scale 回 1 · 300ms
```

完成后屏幕静止 1.5 秒，然后 AI 才开始说话。**停顿即仪式**。

### 7.8 错误微抖（Error Pulse）

```
输入框下方 1px 线：
  bg 从 line-1 → signal → line-1
  时长 1000ms · ease-io
错误文案：
  caption 字号 · signal 色 · 出现 3s 后淡出
整体：不抖动，不红色背景
```

---

## 8. 关键场景设计

### 8.1 Onboarding 剧场

用户打开 App 的前 60 秒——这是产品的第一次表达。

#### Scene 1 · 黑

```
全屏 bg-0
无 Logo · 无文字 · 无任何元素
持续 1200ms
```

故意的静默。

#### Scene 2 · 光

```
呼吸背景渐入 · 1600ms
屏幕正下方出现一个极小的 4×4 px accent 方块
方块 scale 1 → 1 · opacity 0 → 1 · 800ms
```

#### Scene 3 · 初问

```
方块保留。其上方 120 px 处文字淡入：

    What should I call you?

字体：Inter Medium · display 56 / 64 · tracking -0.03em
颜色：fg-0
动效：Y 16 → 0 · opacity 0 → 1 · 480ms · ease-out

再下方 48 px 出现一条线（输入）：

    ________________________

线宽：400 px · 1px line-1
光标：2px 粗 · accent 色 · 800ms 呼吸（这一处例外允许光标）
```

无 Placeholder · 无按钮 · 回车提交。

#### Scene 4 · 识别

```
用户按下回车：

1. 输入文字瞬间变 accent 色 · 120ms
2. 文字 Y 0 → -24 · opacity 1 → 0 · 320ms · ease-in
3. 上方问题同步淡出
4. 新内容从下方渐入：

    Hello, {name}.
    
    (停顿 1.2s)
    
    I'm here to walk one stretch of the road with you.
    Before we start, I need to hear one thing.

    What's the one thing you're trying to move forward right now?
```

AI 的话用 §7.2 的 word stream 展现。

#### Scene 5 · 承接

```
用户输入初始目标后：

1. 文字流入 · opacity 0 · 320ms
2. 呼吸背景 scale 1 → 1.3 · opacity 0.7 → 0 · 800ms
3. 主界面淡入 · 600ms
4. 对话区已有 AI 消息等着：

    Got it.
    「{goal}」
    
    Next, let's break it into something walkable.
    You can stop me anytime by saying "pause".
    
    Ready?
```

#### 设计要点

- **没有跳过按钮**
- **没有进度指示器**
- **没有 Logo 品牌展示**
- 这不是 onboarding flow，这是**开场白**

### 8.2 对话主界面

#### 布局

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  ▪  LEVELUP    ·    Side Project MVP          ⌘K ⚙ │  顶栏 48h
│                                                    │
├──┬─────────────────────────────────────────────────┤
│  │                                                 │
│▪ │                                                 │
│  │   Did you finish the PRD you mentioned          │   AI 消息
│▪ │   yesterday?                                    │   无气泡
│  │                                                 │
│▪ │                                                 │
│  │                         Got three sections in.  │   用户消息
│  │                                             ─── │   右对齐 + 细线
│▪ │                                                 │
│  │   ┌─────────────────────────────────────────┐   │   卡片
│  │   │                                         │   │
│  │   │  ▪  Side Project MVP                    │   │
│  │   │                                         │
│  │   │  ────────────────────              58%  │   │
│  │   │                                         │   │
│  │   │  Current   Finish MVP document          │   │
│  │   │                                         │   │
│  │   │  →  View full path                      │   │
│  │   │                                         │   │
│  │   └─────────────────────────────────────────┘   │
│  │                                                 │
│  │   Where did you get stuck?                      │
│  │                                                 │
│ +│                                                 │
│  │                                                 │
├──┴─────────────────────────────────────────────────┤
│                                                    │
│   >  _____________________________________ ⌘↵     │  输入区
│                                                    │
└────────────────────────────────────────────────────┘
```

#### 消息的现代化处理

- **AI 消息**：无气泡 · Inter Medium · 14 / 22 · fg-0 · 左对齐
- **用户消息**：无气泡 · 右对齐 · 下方一条 24px 宽的 line-2 细线代替气泡
- **头像**：都没有
- **时间戳**：只在长期沉默后首条消息出现一次，caption 字号 fg-2 居中
- **消息间距**：24px · 同方连续消息 12px

#### 输入区

```
┌────────────────────────────────────────────────────┐
│                                                    │
│   >  _____________________________________ ⌘↵     │
│                                                    │
└────────────────────────────────────────────────────┘
```

- 无边框
- 左侧一个 `>` 符号（caption 字号 · fg-2）
- 中间就是一条线（空态）或用户输入（输入中）
- 右侧极淡的 `⌘↵` 快捷键提示
- Focus 时底线从 line-1 → accent · 200ms

### 8.3 Sidebar（现代极简版）

#### 折叠态（56 px）

```
┌──┐
│  │
│▪ │  ← 6px 方点（不是圆点，更现代）
│  │
│▪ │
│  │
│▪ │
│  │
│  │
│  │
│+ │  ← ghost 图标
│  │
└──┘
```

- 玻璃背景
- 只有状态方点
- Hover 300ms 后右侧浮层弹出 tooltip

#### 展开态（280 px）

```
┌────────────────────────────────┐
│                                │
│  GOALS                         │  ← caption · tracking 0.1em · fg-2
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │  ▪  Side Project MVP     │  │  ← h3 · fg-0
│  │                          │  │
│  │  Finish MVP document     │  │  ← small · fg-1
│  │                          │  │
│  │  ──────────────  58%     │  │  ← 进度轨道
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │  ▪  Daily 500 words      │  │
│  │                          │  │
│  │  12 days streak          │  │
│  │                          │  │
│  │  ──────────────────  80% │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  +  NEW GOAL                   │  ← caption · accent · hover 下划线
│                                │
└────────────────────────────────┘
```

- 目标卡片：bg-1 · 1px line-1 · r-md · 内边距 16
- 状态方点：6 × 6 px · 前方 fg-2 或 accent
- 排序：最近活跃 在上

### 8.4 Command Bar（⌘K）

整个产品的核心交互入口。Raycast / Linear / Arc 风格。

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  >  _______________________________________        │  ← 搜索行
│  ──────────────────────────────────────────────    │
│                                                    │
│  GOALS                                             │  ← 分组标题
│  ▪  Side Project MVP              ⌘ 1             │
│  ▪  Daily 500 words               ⌘ 2             │
│                                                    │
│  ACTIONS                                           │
│  +  New goal                      ⌘ N             │
│  ↻  Weekly reflection             ⌘ R             │
│  →  Show full roadmap             ⌘ M             │
│                                                    │
│  ──────────────────────────────────────────────    │
│  ↑↓ navigate   ↵ select   esc close                │  ← 底栏提示
│                                                    │
└────────────────────────────────────────────────────┘
```

- 宽度：560 px · 位置：屏幕中心
- 背景：bg-glass + blur(32px)
- 1px line-1 边框 + shadow-pop
- 键盘优先：↑↓ 选择 · ↵ 执行 · Esc 关闭
- 每项左侧是 6px 方点或图标，右侧是快捷键显示

### 8.5 里程碑完成

动效见 §7.7。

完成时的 UI 细节：

```
卡片状态变化：
  ▪  Side Project MVP         →    ▪  Side Project MVP
                                         ^accent 色
  ──────────────  58%         →    ──────────────────  100%
                                         
                                         MILESTONE COMPLETE
                                         ^caption · accent · uppercase
```

然后 AI 停顿 1.5 秒，只说一句：

> You said three weeks ago you might not make it.
> You did.

**不说"太棒了"，不说"恭喜"，不说"继续加油"。现代极简的情感表达就是准确的事实陈述。**

### 8.6 迷失重锚

识别到负向情绪词时：

```
1. 呼吸背景 opacity 0.4 → 0.8 · 2000ms · ease-io（潜意识加强）
2. AI 停顿 2 秒再回复
3. 回复内容更简短（<30 字）：

    I'm here.
    Do you want to talk, or do you want silence for a bit?
```

不改变字号，不改变色调。现代极简靠**节奏**传递情绪，不靠视觉变化。

### 8.7 空状态

**不用诗**。用简洁准确的事实说明 + 一个清晰的下一步。

| 位置 | 主文 | 次文 |
|:---|:---|:---|
| Sidebar 无目标 | No goals yet | Press ⌘N to create one |
| 对话无历史 | Start talking | I'll remember what you say |
| 已完成全部 | All clear | Take a break, or press ⌘N |
| 离线 | Offline | Your input will send when you reconnect |
| 搜索无结果 | Nothing here | Try a different word |

**格式**：主文 h3 fg-0 居中 + 次文 small fg-2 + 可选 accent 色 CTA

### 8.8 错误

- **无模态弹窗**
- **无红色背景**
- **无震动**

错误表达方式：

| 级别 | UI |
|:---|:---|
| 输入不合法 | 输入框底线变 signal 色 200ms · 下方 caption signal 色提示 3 秒 |
| 网络失败 | 消息气泡下出现 "Retry →" accent 链接 |
| AI 生成失败 | AI 消息被替换为 "Let me think again" + retry |
| 服务器错误 | 顶栏底部出现 1px signal 色线条 · 一行小字 |
| Token 过期 | Command bar 被替换为登录输入 |

---

## 9. 组件库

### 9.1 按钮

极简三种：

**Primary**（一屏最多一个）
```
背景    accent
文字    white（永远的白）
字号    14 · Medium
内边距  10 × 18
圆角    r-sm (6)
Hover   brightness 1.08 · 120ms
Press   scale 0.98 · 120ms
```

**Secondary / Ghost**
```
背景    transparent
文字    fg-0
边框    1px line-1
Hover   bg-2 · 120ms
```

**Text**
```
纯文字 + 可选箭头
Hover   underline 从左滑入 · 200ms
```

**禁止**：渐变 · 阴影 · 多色 · 图标+文字组合（除非命令面板）

### 9.2 输入

**Line Input**（默认）
```
无边框 · 无背景
底线：1px line-1 → accent（focus 时）· 200ms
光标：2px · accent · 800ms blink
占位符：fg-3
```

**Boxed Input**（仅在设置表单等次要场景）
```
背景 bg-1 · 1px line-1
圆角 r-xs
内边距 10 × 12
Focus 边框 accent · 200ms
```

### 9.3 消息气泡（严格来说没气泡）

**AI**
```
无背景 · 无边框 · 无头像
字体 Inter Medium · 14 / 22
颜色 fg-0
左对齐 · 最大宽度 640 px
```

**用户**
```
无背景 · 无边框
字体 Inter Regular · 14 / 22
颜色 fg-0
右对齐 · 下方 24px line-2 细线作为"我说的"视觉标记
最大宽度 520 px
```

### 9.4 卡片

```
┌─────────────────────────────────┐
│                                 │
│  ▪  Side Project MVP            │  ← 6px 方点 + h3
│                                 │
│  ────────────────────      58%  │  ← 进度轨道 + 数字右
│                                 │
│  Current  Finish MVP document   │  ← caption label + small value
│                                 │
│  →  View full path              │  ← 单一 CTA · caption
│                                 │
└─────────────────────────────────┘
```

```
规格
  背景     bg-1
  边框     1px line-1
  圆角     r-md (8)
  内边距   24
  宽度     560 px
  
Hover   
  边框 line-2 · 120ms
  微微浮起：bg-1 亮度 +2%
```

**禁止**：彩色边框 · 阴影 · 装饰角标 · emoji 图标

### 9.5 状态方点

```
尺寸   6 × 6 px
形状   正方形（不是圆！现代极简用方点）
```

| 含义 | 颜色 |
|:---|:---|
| 推进中 | accent |
| 未动 | fg-2 |
| 卡住 | signal |
| 接近完成 | accent · 外有 1px line-1 环 |
| 已完成 | accent 填充 + 外边白环 |
| 已归档 | fg-3 |

### 9.6 进度轨道

```
轨道  width 100% · height 1px · bg: line-1
填充  width X% · height 1px · bg: accent
数字  position absolute right · tabular-nums · caption · fg-1
```

Hover 时填充变为 2px。完成到 100% 时，整条轨道 800ms 内 glow 一下。

### 9.7 浮层 / 抽屉

**Overlay Sheet**（侧滑抽屉）
```
从右滑入 · width 480 px · 320ms ease-io
背景 bg-1 · 1px line-1 左边框
覆盖层 rgba(0,0,0,0.4) blur(4px)
关闭 Esc / 点击覆盖层 / 右上 × 按钮
```

**Popover**（悬浮小窗）
```
背景 bg-glass + blur(20px)
shadow-pop
r-md
padding 16
```

### 9.8 Kbd 键盘提示

```
┌───┐
│ ⌘ │   背景 bg-2 · 1px line-1 · r-xs · caption · fg-1
└───┘
内边距 4 × 6
```

---

## 10. 微交互清单

| 场景 | 细节 |
|:---|:---|
| Hover 链接 | underline 从左滑入 · 200ms |
| Hover 卡片 | 边框 line-1 → line-2 · bg 亮 2% · 120ms |
| Hover Sidebar 目标 | 状态方点 scale 1.2 · accent glow · 120ms |
| 输入聚焦 | 底线 line-1 → accent · 200ms |
| 发送消息 | 用户文字从输入框 Y -24 → 消息区位置 · 320ms |
| 接收消息 | word stream · §7.2 |
| ⌘K | command bar 弹出 · §7.3 |
| ⌘B | Sidebar 滑出 · §7.5 |
| Tab 键导航 | focus ring: 2px accent outline + 2px offset |
| 删除目标 | 卡片 opacity 1 → 0 + scale 1 → 0.98 + blur 0 → 6px · 400ms |
| 归档 | 卡片向 Sidebar 底部飞 · 480ms · ease-io |
| 夜间时段 | 22:00 自动建议切暗模式（一条顶栏横幅） |
| 页面滚动 | 顶栏从透明变 bg-glass · 200ms |
| 进度更新 | 数字 counter 滚动 · tabular-nums · 600ms ease-io |

---

## 11. 声音设计

**默认关闭**（现代极简产品默认静音 · 用户可在设置开启）

若开启：

| 事件 | 声音 | 时长 |
|:---|:---|:---|
| ⌘K 打开 | 极低 click | 40ms |
| 消息发送 | 短 tick | 60ms |
| AI 开始响应 | 极淡 sweep | 240ms |
| 里程碑完成 | 单音 + 尾音 | 600ms |
| 错误 | 无 | — |

Web Audio API · 全部内嵌 · 单音纯正弦波，不要音乐动机。

---

## 12. 暗亮模式

### 12.1 默认暗模式

LevelUp 默认是**暗模式**。这是现代极简产品的默认设定（Linear / Vercel / Arc 都是）。

- 跟随系统可选
- 22:00 后若处于亮模式，顶部出现一行 small 文字建议切换
- 用户手动切换后记住选择

### 12.2 切换动效

```
1. 当前内容 opacity 1 → 0.2 · 120ms
2. 色彩变量瞬时替换
3. 新内容 opacity 0.2 → 1 · 200ms
总时长 320ms
```

不用"灯光调暗"的比喻动效。**快速、精准、无戏剧**。

---

## 13. 反模式

❌ **仪表盘 / 数据看板** · 所有数据都融入对话流，不做总览页
❌ **徽章 / 成就 / 等级** · 成长不靠游戏化
❌ **弹窗 / Toast** · 所有提示内嵌在对话区或顶栏
❌ **红点通知 / 未读数** · 没有噪音
❌ **面包屑 / 多级菜单** · 只有对话 + Sidebar
❌ **加载 Spinner** · 用骨架屏或 AI 的"thinking" 状态
❌ **Empty 插画** · 只有文字
❌ **Onboarding 遮罩 tour** · 靠对话引导
❌ **Confetti** · 用冷光和停顿
❌ **彩色品牌渐变** · 永远 monochrome + accent
❌ **圆形头像** · 不用头像，用 6px 方点或首字母
❌ **Emoji 图标** · 只用线形几何图标
❌ **衬线字体** · 所有地方 Inter
❌ **暖色** · 禁止 amber / orange / brown / cream
❌ **手写感** · 没有任何"人情味"的装饰

---

## 14. 设计 Tokens 汇总

```css
:root {
  /* Color · Light */
  --bg-0: #FAFAFA;
  --bg-1: #FFFFFF;
  --bg-2: #F4F4F5;
  --bg-glass: rgba(255,255,255,0.72);
  
  --fg-0: #09090B;
  --fg-1: #52525B;
  --fg-2: #A1A1AA;
  --fg-3: #D4D4D8;
  
  --line-1: rgba(9,9,11,0.06);
  --line-2: rgba(9,9,11,0.10);
  
  --accent: #3B82F6;
  --accent-glow: rgba(59,130,246,0.24);
  --signal: #F97316;
  
  /* Space */
  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px;
  --sp-4: 16px; --sp-5: 20px; --sp-6: 24px;
  --sp-8: 32px; --sp-10: 40px; --sp-12: 48px;
  --sp-16: 64px;
  
  /* Radius */
  --r-xs: 4px; --r-sm: 6px; --r-md: 8px; --r-lg: 12px; --r-full: 9999px;
  
  /* Motion */
  --t-fast: 120ms;
  --t-base: 200ms;
  --t-mid:  320ms;
  --t-slow: 480ms;
  
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:  cubic-bezier(0.7, 0, 0.84, 0);
  --ease-io:  cubic-bezier(0.87, 0, 0.13, 1);
  
  /* Shadow */
  --shadow-pop: 0 0 0 1px var(--line-1), 0 16px 48px rgba(0,0,0,0.12);
  
  /* Type */
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Geist Mono', monospace;
}

[data-theme="dark"] {
  --bg-0: #09090B;
  --bg-1: #18181B;
  --bg-2: #27272A;
  --bg-glass: rgba(24,24,27,0.76);
  
  --fg-0: #FAFAFA;
  --fg-1: #A1A1AA;
  --fg-2: #71717A;
  --fg-3: #52525B;
  
  --line-1: rgba(255,255,255,0.06);
  --line-2: rgba(255,255,255,0.10);
  
  --accent: #60A5FA;
  --accent-glow: rgba(96,165,250,0.32);
  --signal: #FB923C;
}
```

---

## 15. 落地优先级

### Phase 1 · MVP

- Tokens 系统（亮 / 暗）
- Onboarding 剧场全 5 幕
- 对话主界面 · word stream 消息
- Sidebar 折叠 / 展开
- Command Bar（⌘K）
- 卡片组件 + 涌入动效
- 呼吸光晕背景
- 空状态

### Phase 2

- 里程碑完成动效
- 迷失重锚的节奏调整
- 全部微交互细节
- 抽屉浮层系统

### Phase 3

- 声音系统（可选）
- 暗亮模式自动切换
- 键盘驱动的全部路径（无鼠标可用）
