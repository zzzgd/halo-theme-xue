<script src="//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js"></script>
<#-- marked -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<#-- 代码高亮-->
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
<#--其他语言包-->
<script src="//cdn.jsdelivr.net/gh/xzzai/static@master/js/highlight.lang.js"></script>
<#--代码行数-->
<script src="//cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.7.0/dist/highlightjs-line-numbers.min.js"></script>
<#-- 代码copy按钮-->
<#--<script src="https://cdn.jsdelivr.net/gh/xzzai/highlightjs-copy-button@master/dist/highlightjs-copy-button.min.js"></script>-->
<!--图片预览插件-->
<script data-pjax-viewer src="//cdn.jsdelivr.net/npm/viewerjs@1.5.0/dist/viewer.min.js"></script>
<#-- 模态框-->
<script src="https://cdn.jsdelivr.net/npm/micromodal/dist/micromodal.min.js"></script>
<#--相册插件-->
<script src="//cdn.jsdelivr.net/npm/justifiedGallery@3.7.0/dist/js/jquery.justifiedGallery.min.js"></script>

<#--  顶部菜单  -->
<script src="https://cdn.jsdelivr.net/gh/xzzai/static@master/js/simply-nav.js"></script>
<#--右下角按钮-->
<script src="https://cdn.jsdelivr.net/gh/xzzai/static@master/js/moon.js"></script>

<#--分享-->
<script src="//cdn.jsdelivr.net/npm/social-share.js@1.0.16/dist/js/social-share.min.js"></script>

<#-- 分享-->
<#if settings.visit_statistics!false>
    <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
</#if>

<#--标签云-->
<script src="https://cdn.jsdelivr.net/gh/xzzai/static@master/js/jqcloud-1.0.4.min.js"></script>
<script type='text/javascript'>
    // 标签
    var tagArray = [
        <@tagTag method="list">
        <#list tags as tag>
        {'text': '${tag.name!}', 'weight': '${tag.postCount!}', 'link': '${tag.fullPath!}'},
        </#list>
        </@tagTag>
    ];

    // 分类
    var categoryArray = [
        <@categoryTag method="list">
        <#list categories as category>
        {'text': '${category.name!}', 'weight': '${category.postCount!}', 'link': '${category.fullPath!}'},
        </#list>
        </@categoryTag>
    ];


    $(function () {
        var tagCloud = $("#tagCloud");
        if (tagCloud && tagCloud.children().length === 0) {
            tagCloud.jQCloud(tagArray, {autoResize: true, delayedMode: true});
        }

        var categoryCloud = $("#categoryCloud");
        if (categoryCloud && categoryCloud.children().length === 0) {
            categoryCloud.jQCloud(categoryArray, {autoResize: true, delayedMode: true});
        }
    });

</script>

<#--目录-->
<#if settings.post_toc!true>
    <script src="//cdn.jsdelivr.net/npm/tocbot@4.11.2/dist/tocbot.min.js"></script>
</#if>
<#if settings.Aplayer?? && settings.Aplayer != ''>
    <script src="//cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js"></script>
</#if>
<script type="text/javascript">
    $('.arrow-down').on('click', function () {
        var postHeight = $('#homeHeader').height();
        window.scroll({top: postHeight - 50, behavior: 'smooth'});
    })

    // 禁用的分享站点, 现在已经不支持腾讯微博
    var socialDisabled = '${settings.share_disabeld?default('')}';
</script>
<script type="text/javascript">
    var katex_config = {
        delimiters:
            [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true},
            ]
    };
    var openToc = false;
    <#if settings.post_toc!true>
        openToc = true;
    </#if>
</script>
<#if settings.enabled_mathjax!true>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js" integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.min.js" integrity="sha384-mll67QQFJfxn0IYznZYonOWZ644AWYC+Pt2cHqMaRhXVrursRwvLnLaebdGIlYNa" crossorigin="anonymous"
            onload="if (document.getElementById('write'))
            { renderMathInElement(document.getElementById('write'), katex_config)}
            else if (document.getElementById('tree-hole'))
            {renderMathInElement(document.getElementById('tree-hole'), katex_config)}"></script>
</#if>

<#-- 赞赏模态框 -->
<div class="modal micromodal-slide" id="coffeeModal" aria-hidden="true" role="dialog">
    <div class="modal__overlay model_bg" tabindex="-1" data-micromodal-close="">
        <div class="modal__container" role="dialog" aria-modal="true" id="modalContainer"
             aria-labelledby="modal-1-title">
            <header class="modal__header">
                <h2 class="modal__title" id="coffeeModalTitle"></h2>
                <button class="modal__close" aria-label="Close modal" id="closeCoffeeModalBtn"></button>
            </header>
            <div class="modal__content flex flex-row justify-center" id="coffeeModalContent">
                <#if settings.QR_code_zfb??>
                    <div id='qrCodeZfb' class="pay-code-invisible" code-data="支付宝">
                        <img class="qr_code_zfb qr-code" src="${settings.QR_code_zfb!}" alt="AliPay"/>
                    </div>
                </#if>
                <#if settings.QR_code_wx??>
                    <div id="qrCodeWx" class="pay-code-invisible" code-data="微信支付">
                        <img class="qr_code_wx qr-code" src="${settings.QR_code_wx!}" alt="WeiXinPay"/>
                    </div>
                </#if>
            </div>
            <footer class="modal__footer flex flex-row justify-center">
                <#if settings.QR_code_zfb??>
                    <button class="modal__btn zfb-btn code-btn" id="zfbBtn">支付宝</button>
                </#if>
                <#if settings.QR_code_wx??>
                    <button class="modal__btn wx-btn code-btn" id="wxBtn">微信</button>
                </#if>
            </footer>
        </div>
    </div>
</div>

<#if settings.pjax_enabled!false>
    <script src="https://cdn.jsdelivr.net/npm/pjax@0.2.8/pjax.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js"></script>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.css">
    <script type="text/javascript">
        var pjax = new Pjax({
            elements: 'a[href]:not([href^="#"]):not([data-not-pjax]):not([target^="_blank"]), form', // default is "a[href], form[action]"
            cacheBust: false,
            debug: false,
            selectors: [
                'title',
                '#container'
            ]
        });

        //在Pjax请求开始后触发
        document.addEventListener('pjax:send', function () {
            NProgress.start();

        });

        //在Pjax请求完成后触发
        document.addEventListener('pjax:complete', function (e) {
            NProgress.done();
            // 最开始就要隐藏
            header.hideSubMenu();
            // header
            // header.hoverSubMenu();

            // 加载相册
            if ($("#container").find('.photos-page').length > 0) {
                photo.loadGallery();
                photo.showPhotos();
            }

            // 隐藏 search box 并清空 input
            $('#searchBox').addClass('hidden');
            $("#searchBoxInput").val("");

            // 标签云
            var tagCloud = $("#tagCloud");
            if (tagCloud && tagCloud.children().length === 0) {
                tagCloud.jQCloud(tagArray, {autoResize: true, delayedMode: true});
            }

            // 分类云
            var categoryCloud = $("#categoryCloud");
            if (categoryCloud && categoryCloud.children().length === 0) {
                categoryCloud.jQCloud(categoryArray, {autoResize: true, delayedMode: true});
            }

            // 当前菜单菜单高亮
            hanUtils.highlightMenu();

            //重载
            if (typeof _hmt !== 'undefined') {
                // support 百度统计
                _hmt.push(['_trackPageview', location.pathname + location.search]);
            }
            if (typeof ga !== 'undefined') {
                // support google analytics
                ga('send', 'pageview', location.pathname + location.search);
            }

            // 重新加载 评论
            $('script[data-pjax-comment]').each(function () {
                var commentParent = $(this).parent()
                var comment = $(this).remove();
                commentParent.append(comment);
            });

            $('.icon-toc').each(function () {
                $(this).remove();
            });

            $('#moonToc').removeClass('mm-active');

            if ($("#container").find('.article-content').length > 0) {

                // 转换post内容为 Markdown
                // post.formatContent();

                // 小屏幕目录
                $('#moonMenu').append('<span class="moon-menu-item pl-6 cst-icon icon-toc"></span>')

                moonMenu.initMoonToc();

                moonMenu.ckShowContent();

                // 代码高亮
                post.loadHighlight();

                // 图片预览
                post.initViewer();

                if (openToc) {
                    // 目录事件
                    post.scrollTocFixed();

                    // 初始化toc
                    post.initToc()

                    // 删除文章最开始第一个 <ul>(如果有)
                    post.removeFirstUL()
                }

                // 分享按钮
                post.shareIcon()

                // 模态框
                coffeeModal.toggleCoffeeModal();

                // 初始展示二维码
                coffeeModal.initShowCode();

                // 切换支付二维码
                coffeeModal.switchQrCode();

                try {
                    if (renderMathInElement && typeof renderMathInElement !== 'undefined') {
                        renderMathInElement(document.getElementById('write'), katex_config);
                    }

                    // if (mermaid && typeof mermaid !== 'undefined') {
                    //     mermaid.initialize();
                    // }
                } catch (e) {
                    console.log("error");
                }
            }

            // table 要加上 div 避免出现小屏幕下展示不全
            hanUtils.tableAddNode();

            // li 添加 span
            hanUtils.liAddSpan();

            // 自定义页面 viewer
            hanUtils.sheetViewer();

            // 相册页面 viewer
            hanUtils.journalViewer();


            if (renderMathInElement && typeof renderMathInElement !== 'undefined') {
                if (document.getElementById('write')) {
                    renderMathInElement(document.getElementById('write'), katex_config)
                } else if (document.getElementById('tree-hole')) {
                    renderMathInElement(document.getElementById('tree-hole'), katex_config)
                }
            }

        });

        document.addEventListener('pjax:end', function () {

        });

        //Pjax请求失败后触发，请求对象将作为一起传递event.options.request
        document.addEventListener('pjax:error', function () {
            NProgress.done();
            bar('系统出现问题，请手动刷新一次', '3000');
        });
    </script>
</#if>

<#if settings.TimeStatistics??>
    <script type="text/javascript">
        // 建站时间统计
        function show_date_time() {
            if ($("#span_dt_dt").length > 0) {
                window.setTimeout("show_date_time()", 1000);
                BirthDay = new Date("${settings.TimeStatistics!}");
                today = new Date();
                timeold = (today.getTime() - BirthDay.getTime());
                sectimeold = timeold / 1000;
                secondsold = Math.floor(sectimeold);
                msPerDay = 24 * 60 * 60 * 1000;
                e_daysold = timeold / msPerDay;
                daysold = Math.floor(e_daysold);
                e_hrsold = (e_daysold - daysold) * 24;
                hrsold = Math.floor(e_hrsold);
                e_minsold = (e_hrsold - hrsold) * 60;
                minsold = Math.floor((e_hrsold - hrsold) * 60);
                seconds = Math.floor((e_minsold - minsold) * 60);
                span_dt_dt.innerHTML = daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";
            }
        }

        show_date_time();
    </script>
</#if>

<script type="text/javascript">
    // console.clear();
    console.log("%c 有朋自远方来, 不亦说乎.", "background:#24272A; color:#ffffff", "");
    <#if settings.github??>
        console.log("%c Github %c", "background:#24272A; color:#ffffff", "", "${settings.github!}");
    </#if>

</script>

