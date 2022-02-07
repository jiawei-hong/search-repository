# Dcard Frontend Intern Home Work

# 如何啟動
1. [已經部署好的網址](https://dcard-2022-frontend-homework.herokuapp.com/)

2. npm run start：
    ```shell
    npm run start
    ```
2. npm run build:
    ```shell
    npm run build

    npm install -g serve

    serve -s build
    ```

# 目錄結構
```
|-- .gitignore                      # 控制檔案與資料夾不上傳到Github
|-- package.json                    # 專案資訊
|-- package-lock.json               # package、dependency 安裝資訊
|-- postcss.config.js               # Post CSS 設定檔
|-- README.md                       # 說明文件
|-- tailwind.config.js              # Tailwind CSS 設定檔
|-- public
|-- src
    |-- api.js                      # 存放串接Github API
    |-- App.css
    |-- App.js
    |-- App.test.js
    |-- index.css
    |-- index.js
    |-- logo.svg
    |-- reportWebVitals.js
    |-- setupTests.js
    |-- components                  # 存放專案中使用到的元件
    |   |-- Alert                   # 顯示消息的元件
    |   |   |-- index.css
    |   |   |-- index.js
    |   |-- Icon                    # 顯示圖標的原件
    |   |   |-- index.js
    |   |-- Repository              # 顯示儲存庫的詳細資訊元件
    |   |   |-- index.css
    |   |   |-- index.js
    |   |-- RepositoryList          # 儲存庫清單的元件
    |       |-- Sidebar.js
    |-- pages                       # 存放顯示儲存庫頁面
        |-- Repository.js           # 顯示使用者單個的儲存庫頁面
        |-- RepositoryList.js       # 顯示使用者所有的儲存庫頁面
```