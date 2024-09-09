# Next.js

## 框架约定

### Router

- Routes
- Client
  - Dynamic Routes
    - 路由形式
      - [slug]
      - [...slug]
      - [[...slug]]
    - Server端：动态生成静态路由
      - generateStaticParams
  - Parallel Routes
    - layout
      - @slot
        - default.js
  - Intercepting Routes
    - (.)
    - (..)
    - (..)(..)
    - (...)
- Server
  - Route Handlers
    - Convention
      - route.(js | ts)
      - Route Segment Config
    - Handler
      - cache
      - cookies
      - headers
      - redirects
      - stream
      - cors
      - query / params / body
    - Dynamic Route
      - [slug]
      - [...slug]
      - [[...slug]]
  - Middleware
    - Convention
      - middleware.(js | ts)
      - Matcher config
  - Actions

### Project organization

**features**:

- Private Folders
- Route Groups
- src Directory
- Module Path Alias

**strategies**:

非路由目录，所放位置

- app outside
- app inside
- route inside

非路由目录，可用参考

- components
- lib
- ui
- utils
- styles
