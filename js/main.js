document.addEventListener('DOMContentLoaded', function() {
    // 深色模式切换
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    // 检查本地存储中的深色模式设置
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
    
    // 点击切换深色模式
    darkModeToggle.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-theme') === 'dark') {
            htmlElement.removeAttribute('data-theme');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        }
    });
    
    // 轮播图自动切换
    const bannerItems = document.querySelectorAll('.banner-item');
    const dots = document.querySelectorAll('.dot');
    let currentBannerIndex = 0;
    
    function changeBanner(index) {
        // 移除当前激活状态
        bannerItems[currentBannerIndex].classList.remove('active');
        dots[currentBannerIndex].classList.remove('active');
        
        // 设置新的激活状态
        currentBannerIndex = index;
        bannerItems[currentBannerIndex].classList.add('active');
        dots[currentBannerIndex].classList.add('active');
    }
    
    // 自动轮播
    setInterval(function() {
        let newIndex = (currentBannerIndex + 1) % bannerItems.length;
        changeBanner(newIndex);
    }, 5000);
    
    // 点击切换轮播图
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            changeBanner(index);
        });
    });
    
    // 公告栏轮播
    const announcementList = document.querySelector('.announcement-list');
    const announcementItems = document.querySelectorAll('.announcement-item');
    let currentAnnouncementIndex = 0;
    
    if (announcementItems.length > 0) {
        const itemHeight = announcementItems[0].offsetHeight;
        
        setInterval(function() {
            currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcementItems.length;
            announcementList.style.transform = `translateY(-${currentAnnouncementIndex * itemHeight}px)`;
        }, 3000);
    }
    
    // 返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 移动端菜单切换
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        
        // 切换图标
        const icon = mobileMenuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // 点击页面其他位置关闭移动端菜单
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // 登录和注册弹窗
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginModalClose = document.getElementById('login-modal-close');
    const registerModalClose = document.getElementById('register-modal-close');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    
    // 打开登录弹窗
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('active');
    });
    
    // 打开注册弹窗
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.classList.add('active');
    });
    
    // 关闭登录弹窗
    loginModalClose.addEventListener('click', function() {
        loginModal.classList.remove('active');
    });
    
    // 关闭注册弹窗
    registerModalClose.addEventListener('click', function() {
        registerModal.classList.remove('active');
    });
    
    // 从登录切换到注册
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });
    
    // 从注册切换到登录
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
    
    // 表单提交处理
    const loginForm = loginModal.querySelector('form');
    const registerForm = registerModal.querySelector('form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 这里可以添加登录逻辑
        alert('登录功能即将上线，敬请期待！');
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 这里可以添加注册逻辑
        alert('注册功能即将上线，敬请期待！');
    });
    
    // 获取验证码按钮
    const getCodeBtn = document.querySelector('.modal-form-group .btn-outline');
    getCodeBtn.addEventListener('click', function() {
        const phone = document.getElementById('register-phone').value;
        if (!phone) {
            alert('请输入手机号码');
            return;
        }
        
        // 倒计时功能
        let countdown = 60;
        const originalText = this.innerText;
        this.disabled = true;
        
        const timer = setInterval(() => {
            countdown--;
            this.innerText = `${countdown}秒后重试`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                this.innerText = originalText;
                this.disabled = false;
            }
        }, 1000);
        
        // 这里可以添加获取验证码的逻辑
        alert('验证码已发送到您的手机，请注意查收');
    });
    
    // 卡片和产品卡片hover效果增强
    const cards = document.querySelectorAll('.card, .product-card, .news-card, .help-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px var(--color-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 15px var(--color-shadow)';
        });
    });
    
    // 快速客服点击效果
    const quickServiceItems = document.querySelectorAll('.quick-service-item');
    
    quickServiceItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').innerText;
            if (text === '在线客服') {
                alert('正在为您连接在线客服，请稍候...');
            } else if (text === '手机营业厅') {
                alert('扫描二维码下载手机营业厅APP');
            } else if (text === '扫码关注') {
                alert('扫描二维码关注湖北电信官方微信公众号');
            } else if (text === '意见反馈') {
                alert('感谢您的反馈，我们将不断改进服务');
            }
        });
    });
}); 