# 🛍️ Electron 销售库存管理系统 (Sales & Inventory System)

这是一个基于 Electron 和 SQLite 开发的桌面端销售管理系统。支持商品管理、库存追踪、销售记录以及订单管理。

## ✨ 功能特性

- **商品管理**：增删改查商品信息。
- **进销存管理**：自动计算库存，记录入库与出库。
- **销售终端**：记录销售明细，关联员工与客户。
- **数据持久化**：使用 SQLite 本地数据库，无需安装额外数据库软件。

## 🛠️ 技术栈

- **前端/主框架**：Electron, HTML/CSS/JS
- **后端逻辑**：Node.js
- **数据库**：SQLite3 (better-sqlite3)
- **打包工具**：electron-builder

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/OthHamster/market
cd 你的仓库名
```

### 2. 安装 electron 依赖

```bash
# 设置 electron 镜像
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm install
```

### 3. 安装后端 express 依赖

```bash
# 设置 electron 镜像
cd ./backend
npm install
```

### 4. 设置后端服务器端口

将 backend 文件夹里面的 config 文件中的 port 修改至放行端口

### 5. 开启后端服务器

```bash
node server.js
```

### 6. 配置前端目标服务器地址

```bash
npm start
```

在开启窗口中配置服务器地址，如果是本地可以填写

```端口
http://localhost:后端服务器端口
```

默认服务器是我自己搭建的测试服务器，可能不会一直开

## 🛠️ 开源协议 MIT License
