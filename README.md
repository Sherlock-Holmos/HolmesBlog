# HolmesBlog

<div align="center">

[![Version](https://img.shields.io/badge/version-4.9.3-blue.svg)](https://github.com/tangly1024/NotionNext)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](package.json)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)

一个基于 [NotionNext](https://github.com/tangly1024/NotionNext) 构建的个人博客系统

[功能特性](#功能特性) • [快速开始](#快速开始) • [配置说明](#配置说明) • [开发指南](#开发指南) • [技术栈](#技术栈)

</div>

---

## ✨ 功能特性

- 🎨 **多主题支持** - 内置多款精美主题（Simple、Hexo、Medium、Fukasawa 等）
- 📝 **Notion 集成** - 使用 Notion 作为 CMS，轻松管理博客内容
- 🚀 **性能优化** - 基于 Next.js 14，支持 SSG/ISR，快速响应
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🔍 **SEO 友好** - 自动生成 sitemap，优化搜索引擎收录
- 💬 **多评论系统** - 支持 Giscus、Waline、Twikoo 等多种评论插件
- 📊 **数据统计** - 集成多种访问统计工具（Google Analytics、百度统计等）
- 🌐 **国际化** - 支持多语言切换（中文、英文等）
- 🎯 **全文搜索** - 支持 Algolia 搜索集成
- 🌙 **暗黑模式** - 支持明暗主题自动切换

## 📋 前置要求

- Node.js >= 20.x
- npm 或 yarn 或 pnpm
- Notion 账号（用于内容管理）

## 🚀 快速开始

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

## ⚙️ 配置说明

主要配置文件位于 `blog.config.js` 和 `conf/` 目录下：

### 基础配置

- **blog.config.js** - 博客基础配置（主题、语言、作者信息等）

### 分类配置

- **conf/comment.config.js** - 评论系统配置
- **conf/analytics.config.js** - 统计分析配置
- **conf/widget.config.js** - 挂件配置（聊天客服、音乐播放器等）
- **conf/animation.config.js** - 动画效果配置
- **conf/ad.config.js** - 广告配置
- **conf/code.config.js** - 代码块样式配置
- **conf/plugin.config.js** - 第三方插件配置

### 主题配置

在 `blog.config.js` 中修改 `THEME` 字段选择主题：

```javascript
THEME: 'simple' // 可选: simple, hexo, medium, fukasawa, gitbook, heo, matery 等
```

## 🛠️ 开发指南

### 可用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm start                # 启动生产服务器

# 代码质量
npm run lint             # 运行 ESLint 检查
npm run lint:fix         # 自动修复 ESLint 问题
npm run format           # 格式化代码
npm run type-check       # TypeScript 类型检查

# 测试
npm test                 # 运行测试
npm run test:watch       # 监听模式运行测试
npm run test:coverage    # 生成测试覆盖率报告

# 导出
npm run export           # 导出静态站点
npm run post-build       # 生成 sitemap

# 工具
npm run dev-tools        # 开发工具
npm run health-check     # 健康检查
npm run bundle-report    # 打包分析报告
```

### 项目结构

```
HolmesBlog/
├── blog.config.js          # 博客主配置文件
├── conf/                   # 分类配置目录
├── components/             # React 组件
├── hooks/                  # 自定义 Hooks
├── lib/                    # 工具函数和库
├── pages/                  # Next.js 页面
├── public/                 # 静态资源
├── scripts/                # 脚本文件
├── styles/                 # 样式文件
├── themes/                 # 主题目录
├── types/                  # TypeScript 类型定义
└── __tests__/              # 测试文件
```

### 自定义主题

1. 在 `themes/` 目录下创建新主题文件夹
2. 实现主题所需的布局和组件
3. 在 `blog.config.js` 中设置 `THEME` 为你的主题名称

##  技术栈

- **框架**: Next.js 14.x
- **UI库**: React 18.x
- **样式**: TailwindCSS
- **CMS**: Notion
- **语言**: JavaScript / TypeScript
- **测试**: Jest + React Testing Library

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [NotionNext](https://github.com/tangly1024/NotionNext) - 本项目基于 NotionNext 构建
- [Next.js](https://nextjs.org/) - React 框架
- [Notion](https://notion.so/) - 内容管理系统
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架

## 📮 联系方式

如有问题或建议，欢迎通过博客留言或邮件联系。

---

<div align="center">

**[⬆ 回到顶部](#holmesblog)**

Made with ❤️ by Holmes

</div>
