# Hexo博客搭建步骤文档

## 1. 环境准备

### 1.1 安装Node.js和npm
- 下载Node.js安装包：[Node.js官网](https://nodejs.org/)
- 安装完成后验证版本：
  ```bash
  node -v
  npm -v
  ```

### 1.2 安装pnpm（可选，推荐）
```bash
npm install -g pnpm
```

## 2. 初始化Hexo博客

### 2.1 安装Hexo CLI
```bash
npm install -g hexo-cli
```

### 2.2 初始化博客项目
```bash
hexo init blog
cd blog
```

## 3. 主题配置

### 3.1 安装Butterfly主题
```bash
pnpm install hexo-theme-butterfly --save
```

### 3.2 配置主题
- 编辑`_config.yml`，设置主题：
  ```yaml
theme: butterfly
  ```
- 复制主题配置文件：
  ```bash
  Copy-Item node_modules/hexo-theme-butterfly/_config.yml -Destination _config.butterfly.yml
  ```
- 编辑`_config.butterfly.yml`，配置中文菜单：
  ```yaml
  menu:
    首页: / || fas fa-home
    归档: /archives/ || fas fa-archive
    标签: /tags/ || fas fa-tags
    分类: /categories/ || fas fa-folder-open
    关于: /about/ || fas fa-heart
  ```

## 4. 功能配置

### 4.1 搜索功能
- 安装搜索插件：
  ```bash
  pnpm install hexo-generator-searchdb --save
  ```
- 在`_config.yml`中添加搜索配置：
  ```yaml
  search:
    path: search.xml
    field: post
    content: true
    format: html
  ```

### 4.2 代码高亮
- 编辑`_config.yml`，优化代码高亮设置：
  ```yaml
  highlight:
    line_number: true
    auto_detect: true
    tab_replace: ''
    wrap: true
    hljs: true
  ```

### 4.3 数学公式支持
- 安装数学公式插件：
  ```bash
  pnpm install hexo-renderer-mathjax --save
  ```

### 4.4 图表展示支持
- 安装图表插件：
  ```bash
  pnpm install hexo-filter-mermaid-diagrams --save
  ```

## 5. 本地预览

- 启动本地服务器：
  ```bash
  pnpm run server
  ```
- 访问：http://localhost:4000/

## 6. 部署配置

### 6.1 安装部署插件
```bash
pnpm install hexo-deployer-git --save
```

### 6.2 配置部署信息
- 编辑`_config.yml`，添加部署配置：
  ```yaml
  deploy:
    type: git
    repo: https://github.com/yourusername/yourusername.github.io.git
    branch: main
    message: "Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}"
  ```

### 6.3 执行部署
```bash
pnpm run deploy
```

## 7. 常用操作命令

### 7.1 创建新文章
```bash
hexo new "文章标题"
```

### 7.2 创建新页面
```bash
hexo new page "页面名称"
```

### 7.3 生成静态文件
```bash
pnpm run build
```

### 7.4 清理缓存文件
```bash
pnpm run clean
```

### 7.5 启动本地服务器（带自动刷新）
```bash
pnpm run server
```

### 7.6 部署到远程仓库
```bash
pnpm run deploy
```

## 8. 文章写作规范

### 8.1 文章头信息
```yaml
---
title: 文章标题
date: 2023-01-01 12:00:00
categories: 分类名称
tags: 
  - 标签1
  - 标签2
description: 文章描述
---
```

### 8.2 支持的功能
- **代码高亮**：使用```语言标识 代码块
- **数学公式**：使用$内联公式$，$$块级公式$$
- **图表**：使用mermaid语法

## 9. 后续维护

### 9.1 更新主题
```bash
pnpm update hexo-theme-butterfly
```

### 9.2 更新插件
```bash
pnpm update
```

### 9.3 备份配置文件
- 定期备份`_config.yml`和`_config.butterfly.yml`文件
- 备份`source/_posts`目录下的文章

## 10. 常见问题

### 10.1 主题不生效
- 检查`_config.yml`中theme设置是否正确
- 检查主题是否正确安装

### 10.2 本地预览异常
- 执行`pnpm run clean`清理缓存，重新生成
- 检查配置文件是否有语法错误

### 10.3 部署失败
- 检查Git仓库地址是否正确
- 检查Git权限设置
- 执行`pnpm run clean && pnpm run build`后重新部署
