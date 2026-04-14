# P0 · MVP TODO

> 来源：[Notion 全局 Todo](https://www.notion.so/qhhdf/20260411-LevelUp-Todo-33f5097bfa3a8082bc74d6eb6ba3e088)
> 同步时间：2026-04-14

---

## 前端 · 交互补全与行为真实化

- [ ] `packages/motion`：抽出 WordStream / AmbientHalo / CardPush / SidebarSlide / CommandBarRise / MilestoneFlash / ErrorPulse，reduced-motion 统一管理
- [ ] Command Bar `⌘K` 全局可唤起（cmdk 接入 · 拼音首字母匹配）
- [ ] Sidebar `⌘B` 折叠/展开双态驱动 · 持久化 localStorage · SSR 读 cookie
- [ ] Goal Detail Drawer 全局 DrawerHost 栈 · 点击 Sidebar 目标 / 卡片 VIEW FULL PATH → 打开
- [ ] Onboarding 建档 5 步对接后端（锚定 / 定义完成 / 拆里程碑 / 聚焦本周 / 绑定情境）
- [ ] 主对话卡片完整 6 类渲染（progress / locate / status / summary / encourage / celebrate）
- [ ] WordStream 应用到真正的 AI 消息流（当前 SSE token 直接落，没走 stagger）
- [ ] 主题切换：22:00 顶栏提示横幅 · SSR 预置 cookie 防闪烁
- [ ] `/settings` 对接后端：Profile · Persona slider · What I Remember · MCP Token · 导出 · 一键删除
- [ ] 键盘快捷键 hub（⌘K / ⌘B / ⌘/ / Esc / ⌘Enter）
- [ ] 视觉回归测试（Playwright 截图 diff 11 个路由关键帧）
- [ ] 移动端 / 平板响应式断点

## 后端 · MVP 闭环

- [ ] `apps/worker` 独立进程：digestWriter 轮询 + 失败重试
- [ ] `packages/vector`：sqlite-vec 真实实现（替换 noopVectorStore）
- [ ] `memory.searchDigests` 改走真实向量召回
- [ ] `memory.forgetDigest` 同步向量库删除
- [ ] 重要度衰减 job（每周一 04:00）
- [ ] 每周聚合 job（周日 23:00）
- [ ] 沉默检测 job（每小时）
- [ ] 备份 job（每日 03:00 · VACUUM INTO + tar）
- [ ] 归档 job（每月 1 日 · 90 天前 digest → archive）
- [ ] 文件锁兜底：worker 和 api 共享 locks（proper-lockfile）
- [ ] `conversation.resolveOpeningMessage`：根据 last_msg_at 返回 continue/reopen/reconnect

## 鉴权与账户

- [ ] Lucia 正式接入（替换 dev-login）
- [ ] Magic link 邮件登录
- [ ] Google OAuth（@oslojs/oauth2 + state/nonce）
- [ ] Session rolling renewal（剩余 <7d 自动续期）
- [ ] 软删除墓碑清理：cron 30 天后物理 deprovision

## 实施意图

- [ ] `packages/implementation-intention`：LLM 校验 + 重写
- [ ] 失败计数触发 directness 校准 + 自动建议重写
- [ ] 与 onboarding Step 5 对接

## 卡片密度细化

- [ ] 同类 1h 去重持久化
- [ ] C5 encourageCard 真实取 digest 里完成的动作
- [ ] celebrate card 在 goal-tree.completeMilestone 后广播

## MCP Server 补齐

- [ ] `log_progress` tool
- [ ] `send_message` tool（P1 scope）
- [ ] MCP Resources
- [ ] Rate limit（per token · token-bucket · 60/min 读 · 20/min 写）
- [ ] 标准 MCP 协议一致性（走官方 SDK）
- [ ] `@levelup/mcp-proxy` npm 包
- [ ] Settings Activity tab

## 部署

- [ ] Dockerfile 实测通过
- [ ] `docker compose up` 冒烟测试
- [ ] Caddyfile 生产域名 + 自动 HTTPS
- [ ] 恢复脚本 `scripts/restore-tenant.js`
- [ ] 管理 CLI：admin list-tenants / delete-tenant / tenant-stats
- [ ] `/healthz` 扩展

## 质量

- [ ] ESLint 规则 `@levelup/no-cross-tenant` / `no-raw-path` / `no-hex-color` / `no-bold-700` / `no-emoji-in-jsx`
- [ ] pnpm lint + CI（github actions）
- [ ] 1000 条 LLM 输出样本 · validateResponse · 套话命中率 < 5%
- [ ] 人格一致性测试（同 soul 同 question 10 次采样 · tone 方差 < 0.1）

## 已知 tech debt

- [ ] Anthropic SDK prompt caching 用正确 TextBlockParam 重开
- [ ] `conversation.tail(10)` 抽包
- [ ] `context.buildContext` goals 段 goalsMd vs snapshots 二选一
- [ ] `memoryStore.readRecentDigests` parser 加 fast-check
- [ ] system.db migration 走版本表
- [ ] tenantId 用户可见场景 lowercase
- [ ] eventBus 跨模块广播
- [ ] ScenesNav 生产构建按 env 隐藏
- [ ] `/scenes/*` 对接真实后端数据源
