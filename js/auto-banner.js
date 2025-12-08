// 图片自动轮播功能 - 使用多个二次元图片API
(function() {
  // 从配置文件获取的图片API列表
  // 注意：这些API地址会在HTML生成时被Hexo替换为实际配置的值
  const imageApis = [
    'https://www.dmoe.cc/random.php',
    'https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images',
    'https://t.alcy.cc/fj',
    'https://api.paugram.com/wallpaper/',
    'https://api.cmvip.cn/API/se18url.php'
  ];
  
  // 配置
  const config = {
    interval: 5000,          // 切换间隔（毫秒）
    transitionTime: 1000,     // 过渡时间（毫秒）
    maxRetries: 2             // 单个API最大重试次数
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
  let currentApiIndex = 0;
  
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
  
  // 获取随机API
  function getRandomApi() {
    return imageApis[Math.floor(Math.random() * imageApis.length)];
  }
  
  // 获取随机图片
  async function getRandomImage() {
    let retries = 0;
    
    while (retries < config.maxRetries) {
      retries++;
      try {
        // 随机选择一个API
        const apiUrl = getRandomApi();
        // 添加时间戳避免缓存
        const imageUrl = `${apiUrl}?t=${Date.now()}`;
        
        // 预加载图片
        await preloadImage(imageUrl);
        return imageUrl;
      } catch (error) {
        console.error(`第${retries}次获取图片失败:`, error);
        // 重试前等待一段时间
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    throw new Error(`超过最大重试次数(${config.maxRetries})`);
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
    console.log('使用的图片API列表:', imageApis);
    
    changeImage(); // 立即显示第一张图片
    
    // 设置自动轮播
    setInterval(() => {
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
