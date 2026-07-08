# GitHub Pages 部署说明

本目录是纯静态原型站点，可以直接部署到 GitHub Pages。部署后用户访问仓库 Pages 地址即可打开 `index.html` 查看需求说明和 App 原型。

## 推荐仓库名

```text
ai-recorder-app-prototype-v3
```

## 访问地址

如果仓库为公开仓库，并启用 GitHub Pages，访问地址通常是：

```text
https://<你的 GitHub 用户名>.github.io/ai-recorder-app-prototype-v3/
```

指定页面可通过参数直达：

```text
https://<你的 GitHub 用户名>.github.io/ai-recorder-app-prototype-v3/index.html?page=APP-HOME-01
```

## GitHub Pages 设置

在 GitHub 仓库页面：

1. 进入 `Settings`。
2. 进入 `Pages`。
3. `Build and deployment` 选择 `Deploy from a branch`。
4. `Branch` 选择 `main`，目录选择 `/root`。
5. 保存后等待 GitHub 生成 Pages 链接。

## 首次推送命令

在本目录执行：

```bash
git remote add origin https://github.com/<你的 GitHub 用户名>/ai-recorder-app-prototype-v3.git
git branch -M main
git push -u origin main
```

## 后续更新命令

修改原型后执行：

```bash
node scripts/build-inline.js
node --check app.js
git add .
git commit -m "Update app prototype"
git push
```
