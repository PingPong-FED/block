# Block 是什么？

Block 是一个专为 Axios.js 开发的**模块装饰器管理模式**。它采用集中式存储管理应用的所有 API 模块，并以相应的规则保证 API 以一种统一的方式进行调用。现已支持自动生成 vuex api module。

### 什么是“模块装饰器管理模式”？

让我们从一个简单的 Axios 调用方式开始：

```js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.pingpongx.com/',
})

export const getUserInfo = (params, data) => {
  return instance.get(`/api/getUserInfo`, { params, data })
}
```

这个调用方式包含以下几个部分：

- **axios.create()**，创建 Axios 实例；
- **baseURL**，请求 URL 的基本路径；
- **instance**，Axios 实例；

- **getUserInfo**，API 调用方法名；
- **params**，请求连接中的请求参数；
- **data**，请求体的参数；
- **axios.get()**，Axios 请求方法。
- **/api/getUserInfo**，请求的 URL

每次新增 api 时，你必须通过既有的方式去 copy 代码，并做以下几件事：

- 命名方法
- 写入参
- 参数拼接
- url 拼接（可选）
- try catch（可选）
- 定义拦截器或写拦截器兼容代码（可选）
- 为请求指定配置（可选）

那我们来看看 Block 是**如何定义 API 模块**的：

```js
import { base, get } from '@ppfed/block'

@base('https://www.pingpongx.com/')
class User {
    @get('/api/getUserInfo')
    public getUserInfo() {}
}

export default User
```

简单来说，Block 就是使用**类+装饰器**来统一 API 层的写法风格。

用增加 url-template、qs 等扩展的方式，使得开发者能高效地写出更简洁的代码。

## LICENSE

[MIT](https://github.com/PingPong-FED/block/blob/master/LICENSE)
