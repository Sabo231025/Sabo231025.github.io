---
title: Hexo博客搭建指南
date: 2025-12-08 15:00:00
categories: 技术
tags:
  - Hexo
  - 博客
  - 搭建指南
---

# Hexo博客搭建指南

## 什么是Hexo？

Hexo是一个快速、简洁且高效的静态博客框架。Hexo使用Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

## 为什么选择Hexo？

- 🚀 **速度快**：基于Node.js，生成静态文件的速度极快
- 🎨 **主题丰富**：拥有大量精美的主题可供选择
- ✍️ **Markdown支持**：使用熟悉的Markdown语法写作
- 📦 **插件生态**：丰富的插件扩展功能
- 🚢 **部署简单**：一键部署到GitHub Pages、Netlify等平台

## 环境准备

在开始搭建Hexo博客之前，你需要准备以下环境：

1. **Node.js** (建议版本14.0以上)
2. **Git**

### 安装Node.js

访问[Node.js官网](https://nodejs.org/)下载并安装适合你系统的Node.js版本。

### 安装Git

访问[Git官网](https://git-scm.com/)下载并安装Git。

## 安装Hexo

### 1. 安装Hexo CLI

打开终端，执行以下命令安装Hexo CLI：

```bash
npm install -g hexo-cli
```

### 2. 初始化博客

选择一个目录作为你的博客根目录，执行以下命令初始化Hexo博客：

```bash
hexo init my-blog
cd my-blog
npm install
```

### 3. 目录结构

初始化完成后，你的博客目录结构如下：

```
my-blog/
├── _config.yml        # 站点配置文件
├── package.json       # 依赖配置
├── scaffolds/         # 模板文件夹
├── source/            # 源文件目录
│   ├── _drafts/       # 草稿目录
│   └── _posts/        # 文章目录
└── themes/            # 主题目录
```

## 配置Hexo

### 1. 站点配置

编辑`_config.yml`文件，配置你的站点信息：

```yaml
# Site
title: 你的博客名称
subtitle: 博客副标题
description: 博客描述
author: 你的名字
language: zh-CN
timezone: Asia/Shanghai

# URL
url: https://yourusername.github.io
default_category: uncategorized
```

### 2. 主题选择与配置

Hexo支持多种主题，这里以Butterfly主题为例：

#### 安装Butterfly主题

```bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

#### 启用主题

在`_config.yml`中设置：

```yaml
theme: butterfly
```

#### 配置主题

复制主题配置文件到博客根目录：

```bash
cp themes/butterfly/_config.yml.example _config.butterfly.yml
```

然后编辑`_config.butterfly.yml`配置主题。

## 写作文章

### 创建新文章

执行以下命令创建一篇新文章：

```bash
hexo new "文章标题"
```

### 文章格式

文章使用Markdown格式，位于`source/_posts/`目录下，示例：

```markdown
---
title: 文章标题
date: 2025-12-08 15:00:00
categories: 分类
tags:
  - 标签1
  - 标签2
---

# 文章内容

这是一篇使用Hexo创建的文章。
```

## 本地预览

执行以下命令启动本地服务器：

```bash
hexo server
```

然后在浏览器中访问`http://localhost:4000`预览你的博客。

## 生成静态文件

执行以下命令生成静态文件：

```bash
hexo generate
```

或使用简写：

```bash
hexo g
```

## 部署到GitHub Pages

### 1. 安装部署插件

```bash
npm install hexo-deployer-git --save
```

### 2. 配置部署信息

在`_config.yml`中添加部署配置：

```yaml
deploy:
  type: git
  repo: https://github.com/yourusername/yourusername.github.io.git
  branch: main
```

### 3. 部署博客

执行以下命令部署博客：

```bash
hexo deploy
```

或使用简写：

```bash
hexo d
```

## 常用命令

```bash
# 新建文章
hexo new [title]

# 生成静态文件
hexo generate

# 启动本地服务器
hexo server

# 部署博客
hexo deploy

# 清理缓存文件和生成的静态文件
hexo clean

# 生成并部署
hexo g -d
```

## 高级配置

### 1. 添加评论系统

Butterfly主题支持多种评论系统，如Valine、Waline、Gitalk等。以Waline为例：

在`_config.butterfly.yml`中配置：

```yaml
comments:
  use: waline
  waline:
    serverURL: https://your-waline-server.example.com
    pageview: true
```

### 2. 添加搜索功能

安装搜索插件：

```bash
npm install hexo-generator-searchdb --save
```

在`_config.yml`中配置：

```yaml
search:
  path: search.xml
  field: post
  content: true
  format: html
```

在`_config.butterfly.yml`中启用搜索：

```yaml
search:
  use: local_search
```

## 总结

通过以上步骤，你已经成功搭建了一个基于Hexo的静态博客，并部署到了GitHub Pages。现在你可以开始写作和分享你的文章了！

Hexo的生态非常丰富，你可以根据自己的需求安装各种插件和主题，打造属于自己的个性化博客。

祝你使用Hexo愉快！ 🎉