# Dcard Frontend Intern Home Work

# 如何啟動

1. [已經部署好的網址](https://dcard-2022-frontend-homework.herokuapp.com/)

2. npm run start：
   ```shell
   npm run start
   ```
3. npm run build:

   ```shell
   npm run build

   npm install -g serve

   serve -s build
   ```

# 目錄結構

```
│  .gitignore
│  package-lock.json
│  package.json
│  postcss.config.js             # Post CSS 設定檔
│  README.md                     # 說明文件
│  tailwind.config.js            # Tailwind CSS 設定檔
├──public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
└──src
    │  api.js                    # 存放串接Github API
    │  App.css
    │  App.js
    │  App.test.js
    │  index.css
    │  index.js
    │  logo.svg
    │  reportWebVitals.js
    │  setupTests.js
    │
    ├─components                 # 存放專案中使用到的元件
    │  ├─Alert                   # 顯示消息的元件
    │  │      index.css
    │  │      index.js
    │  ├─Icon                    # 顯示圖標的元件
    │  │      index.js
    │  │
    │  ├─IconText                # 顯示圖標和文件的元件
    │  │      index.js
    │  │
    │  ├─Markdown                # 顯示儲存庫的README元件
    │  │      index.js
    │  │
    │  ├─Navbar                  # 顯示導覽列的元件
    │  │      index.js
    │  │
    │  ├─Organization            # 顯示使用者擁有的組織機構元件
    │  │      index.js
    │  │
    │  ├─OrganizationList        # 顯示使用者擁有的組織機構列表元件
    │  │      index.js
    │  │
    │  ├─Repository              # 顯示使用者擁有的儲存庫元件
    │  │      index.css
    │  │      index.js
    │  │
    │  ├─RepositoryLanguage      # 顯示儲存庫編寫最多的程式語言的元件
    │  │      index.js
    │  │
    │  ├─RepositoryList          # 顯示使用者擁有的儲存庫列表元件
    │  │      index.js
    │  │      Sidebar.js
    │  │
    │  ├─Topic                   # 顯示儲存庫的主題元件
    │  │      index.js
    │  │
    │  └─TopicList               # 顯示儲存庫的主題列表元件
    │          index.js
    └─pages                      # 存放專案中使用到的頁面
            Repository.js        # 使用者儲存庫頁面
            RepositoryList.js    # 使用者儲存庫列表頁面
            Trend.js             # 當前Github上最多星星的專案遞減頁面
```
