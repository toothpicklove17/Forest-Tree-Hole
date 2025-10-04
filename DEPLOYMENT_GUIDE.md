# 🚀 Cloudflare Pages 部署指南

## 快速部署步驟（5分鐘完成）

### 步驟 1: 前往 Cloudflare Pages
- 打開瀏覽器，前往：https://pages.cloudflare.com/
- 點擊右上角 **"Log in"** 登錄你的 Cloudflare 賬號

### 步驟 2: 連接 GitHub
- 點擊 **"Connect to Git"** 按鈕
- 選擇 **"GitHub"** 並點擊 **"Authorize Cloudflare Pages"**
- 在倉庫列表中選擇：**`toothpicklove17/forest-tree-hole`**

### 步驟 3: 配置構建設置
在 **"Configure your project"** 頁面：

```
Project name: forest-tree-hole
Production branch: main
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: (留空)
```

### 步驟 4: 部署
- 點擊 **"Save and Deploy"** 按鈕
- 等待 2-3 分鐘構建完成

### 步驟 5: 完成！
- 構建成功後，你的網站將在以下地址可用：
- **主要域名**: `https://forest-tree-hole.pages.dev`
- **自定義域名**: 可在 Cloudflare Dashboard 中設置

## 🔧 如果遇到問題

### 構建失敗？
1. 檢查構建日誌中的錯誤信息
2. 確保 Framework preset 選擇了 **"Vite"**
3. 確保 Build command 是 **"npm run build"**
4. 確保 Build output directory 是 **"dist"**

### 網站無法訪問？
1. 檢查構建是否成功完成
2. 等待 5-10 分鐘讓 DNS 傳播
3. 嘗試清除瀏覽器緩存

## 📱 自動部署
- 每次你推送代碼到 GitHub 的 `main` 分支
- Cloudflare Pages 會自動重新構建和部署你的網站
- 無需手動操作！

## 🎉 完成後
你的 Forest Tree Hole 網站就正式上線了！
- 全球 CDN 加速
- 自動 HTTPS
- 免費託管
- 自動部署

---
**需要幫助？** 如果遇到任何問題，請告訴我具體的錯誤信息！
