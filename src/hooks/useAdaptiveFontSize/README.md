# useAdaptiveLayout Hook 使用文档

## 目录
- [useAdaptiveLayout Hook 使用文档](#useadaptivelayout-hook-使用文档)
  - [目录](#目录)
  - [简介](#简介)
  - [基础用法](#基础用法)
  - [配置参数](#配置参数)
    - [参数详解](#参数详解)
  - [返回值](#返回值)
  - [CSS 变量](#css-变量)
  - [最佳实践](#最佳实践)
  - [常见问题](#常见问题)
    - [Q: 页面出现滚动条怎么办？](#q-页面出现滚动条怎么办)
    - [Q: 如何处理字体最小值？](#q-如何处理字体最小值)
    - [Q: 在服务端渲染(SSR)中使用报错？](#q-在服务端渲染ssr中使用报错)
  - [示例](#示例)
    - [基础示例](#基础示例)
    - [大屏展示](#大屏展示)
    - [移动端适配](#移动端适配)

## 简介

`useAdaptiveLayout` 是一个React Hook，用于实现响应式布局和自适应缩放。它可以根据屏幕尺寸自动调整页面的缩放比例和字体大小，特别适合以下场景：

- 数据可视化大屏
- 管理系统控制台
- 需要精确还原设计稿的页面
- 跨设备自适应布局

## 基础用法

```typescript
import { useAdaptiveLayout } from 'use-adaptive-layout';

const App = () => {
  // 使用默认配置
  const scale = useAdaptiveLayout();
  
  return (
    <div>
      <h1>当前缩放比例: {scale}</h1>
      {/* 你的应用内容 */}
    </div>
  );
};
```

## 配置参数

`useAdaptiveLayout` 接受一个配置对象，所有参数都是可选的：

```typescript
interface AdaptiveLayoutOptions {
  designWidth?: number;    // 设计稿宽度，默认1920
  designHeight?: number;   // 设计稿高度，默认919
  minWidth?: number;       // 最小宽度，默认320
  maxWidth?: number;       // 最大宽度，默认2560
  basePixelSize?: number;  // 基础字体大小，默认16
  minFontSize?: number;    // 最小字体大小，默认12
  debounceDelay?: number;  // 防抖延迟，默认250ms
}
```

### 参数详解

- **designWidth**: 设计稿的宽度（像素）。这是计算缩放比例的基准宽度。
- **designHeight**: 设计稿的高度（像素）。用于计算高度缩放比例。
- **minWidth**: 页面最小宽度。当屏幕宽度小于此值时，将使用此值计算缩放。
- **maxWidth**: 页面最大宽度。当屏幕宽度大于此值时，将使用此值计算缩放。
- **basePixelSize**: 基础字体大小，影响rem单位的计算基准。
- **minFontSize**: 最小字体大小，确保字体不会小到难以阅读。
- **debounceDelay**: 窗口调整时的防抖延迟时间（毫秒）。

## 返回值

Hook 返回一个数字，表示当前的缩放比例。这个值可以用于：

- 监控当前缩放状态
- 在JavaScript中进行自定义缩放计算
- 作为组件的条件渲染依据

## CSS 变量

Hook 会自动设置以下CSS变量，你可以在样式中使用它们：

- `--adaptive-font-size`: 当前计算后的字体大小（px）
- `--adaptive-scale`: 当前缩放比例

使用示例：

```css
.my-element {
  /* 使用自适应字体大小 */
  font-size: var(--adaptive-font-size);
  
  /* 使用缩放比例 */
  transform: scale(var(--adaptive-scale));
}
```

## 最佳实践

1. **全局配置**
   ```typescript
   // _app.tsx 或其他顶层组件
   const App = ({ Component, pageProps }) => {
     useAdaptiveLayout({
       designWidth: 1920,
       designHeight: 1080
     });
     
     return <Component {...pageProps} />;
   };
   ```

2. **使用rem单位**
   ```css
   .container {
     width: 10rem;  /* 将根据根元素字体大小自动缩放 */
     height: 8rem;
   }
   ```

3. **响应式设计**
   ```typescript
   const MyComponent = () => {
     const scale = useAdaptiveLayout();
     
     return (
       <div style={{
         padding: scale < 0.8 ? '1rem' : '2rem'
       }}>
         {/* 内容 */}
       </div>
     );
   };
   ```

## 常见问题

### Q: 页面出现滚动条怎么办？
A: Hook 默认设置了 `overflow: hidden`。如果需要滚动，在内容容器上设置：
```css
.content-container {
  height: 100%;
  overflow-y: auto;
}
```

### Q: 如何处理字体最小值？
A: 通过 `minFontSize` 参数设置：
```typescript
useAdaptiveLayout({
  minFontSize: 14  // 设置最小字体大小为14px
});
```

### Q: 在服务端渲染(SSR)中使用报错？
A: 确保代码运行在客户端：
```typescript
// 方式1：使用动态导入
const Component = dynamic(() => import('./Component'), { ssr: false });

// 方式2：使用useEffect
useEffect(() => {
  // 在这里使用useAdaptiveLayout的结果
}, []);
```

## 示例

### 基础示例
```typescript
const BasicExample = () => {
  const scale = useAdaptiveLayout();
  
  return (
    <div className="container">
      <div className="card" style={{ fontSize: '1rem' }}>
        这是一个会自动缩放的卡片
      </div>
    </div>
  );
};
```

### 大屏展示
```typescript
const DashboardExample = () => {
  const scale = useAdaptiveLayout({
    designWidth: 3840,
    designHeight: 2160,
    basePixelSize: 24
  });
  
  return (
    <div className="dashboard">
      <header style={{ height: '4rem' }}>顶部导航</header>
      <main style={{ padding: '2rem' }}>
        {/* 数据展示内容 */}
      </main>
    </div>
  );
};
```

### 移动端适配
```typescript
const MobileExample = () => {
  const scale = useAdaptiveLayout({
    designWidth: 375,
    minWidth: 320,
    maxWidth: 480,
    basePixelSize: 14
  });
  
  return (
    <div className="mobile-app">
      {/* 移动端内容 */}
    </div>
  );
};
```
