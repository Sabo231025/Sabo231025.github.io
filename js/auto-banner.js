// 简化版图片自动轮播功能 - 使用樱花API
(function() {
  // 配置
  const config = {
    interval: 5000,          // 切换间隔（毫秒）
    transitionTime: 1000,     // 过渡时间（毫秒）
    // 使用多个图片API，随机选择
    apiUrls: [
      'https://www.dmoe.cc/random.php',  // 樱花API
      'https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images'  // 新增的动漫图片API
    ],
    maxRetries: 3             // 最大重试次数
  };
  
  // 获取header元素
  const header = document.getElementById('page-header');
  if (!header) {
    console.error('无法找到#page-header元素');
    return;
  }
  
  // 设置header基础样式
  header.style.backgroundSize = 'cover';
  header.style.backgroundPosition = 'center';
  header.style.backgroundRepeat = 'no-repeat';
  header.style.transition = `background-image ${config.transitionTime}ms ease-in-out`;
  
  let isLoading = false;
  let currentImage = '';
  
  // 获取随机图片API的图片
  async function getRandomImage() {
    let retries = 0;
    
    while (retries < config.maxRetries) {
      retries++;
      try {
        // 从API列表中随机选择一个
        const randomIndex = Math.floor(Math.random() * config.apiUrls.length);
        const selectedApi = config.apiUrls[randomIndex];
        
        // 注意：直接使用图片URL，不通过fetch请求JSON，避免CORS问题
        // 直接访问URL会返回图片，不需要JSON解析
        const imageUrl = `${selectedApi}?t=${Date.now()}`; // 添加时间戳避免缓存
        
        console.log(`使用API: ${selectedApi}`);
        
        // 预加载图片
        await preloadImage(imageUrl);
        return imageUrl;
      } catch (error) {
        console.error(`第${retries}次获取图片失败:`, error);
        // 重试前等待一段时间
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    throw new Error(`超过最大重试次数(${config.maxRetries})`);
  }
  
  // 预加载图片
  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`图片加载失败: ${url}`));
      img.src = url;
      
      // 5秒超时
      setTimeout(() => reject(new Error(`图片加载超时: ${url}`)), 5000);
    });
  }
  
  // 切换图片
  async function changeImage() {
    if (isLoading) return;
    
    isLoading = true;
    
    try {
      const imageUrl = await getRandomImage();
      currentImage = imageUrl;
      header.style.backgroundImage = `url(${imageUrl})`;
      console.log('图片切换成功:', imageUrl);
    } catch (error) {
      console.error('图片切换失败:', error);
      // 如果当前没有图片，使用占位图
      if (!currentImage) {
        header.style.backgroundImage = `url(/img/butterfly-icon.png)`;
      }
    } finally {
      isLoading = false;
    }
  }
  
  // 初始化
  function init() {
    console.log('初始化图片轮播...');
    changeImage(); // 立即显示第一张图片
    
    // 设置自动轮播
    setInterval(() => {
      console.log('自动切换图片...');
      changeImage();
    }, config.interval);
    
    console.log('图片轮播已启动，间隔:', config.interval, 'ms');
  }
  
  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
