# jsd2207-csmall-web-client

## Project setup项目依赖
```
npm install
```

### Compiles and hot-reloads for development运行项目
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 引入Axios框架
````
npm i axios -S
````
然后在main.js中添加配置 

```
import axios from 'axios';
Vue.prototype.axios = axios;
```

### 引入Element -UI框架

```
npm i element-ui -S
```

然后，需要在`main.js`中添加配置：

```javascript
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

#### 安装QS框架

```
npm i qs -S
```

然后，在`main.js`中添加配置：

```javascript
import qs from 'qs';

Vue.prototype.qs = qs;
```

在项目中，当需要将对象转换为FormData格式时，例如：

```javascript
let formData = this.qs.stringify(this.ruleForm);
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
