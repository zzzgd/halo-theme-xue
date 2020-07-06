var coffeeModal={toggleCoffeeModal:function(){$("#buyCoffee").on("click",function(){var coffeeModal=$("#coffeeModal");coffeeModal.addClass("is-open");coffeeModal.attr("aria-hidden","false")});$("#closeCoffeeModalBtn").on("click",function(){var coffeeModal=$("#coffeeModal");coffeeModal.attr("aria-hidden","true");setTimeout(function(){coffeeModal.removeClass("is-open")},100)})},initShowCode:function(){var firstCode=$("#coffeeModalContent").children(":first");if(firstCode){firstCode.addClass("qr-code-visible");var codeData=firstCode.attr("code-data");$("#coffeeModalTitle").text(codeData)}},switchQrCode:function(){$("#zfbBtn").on("click",function(){var $qrCodeZfb=$("#qrCodeZfb");$qrCodeZfb.addClass("qr-code-visible");$("#qrCodeWx").removeClass("qr-code-visible");$("#coffeeModalTitle").text("支付宝")});$("#wxBtn").on("click",function(){var $qrCodeWx=$("#qrCodeWx");$qrCodeWx.addClass("qr-code-visible");$("#qrCodeZfb").removeClass("qr-code-visible");$("#coffeeModalTitle").text("微信支付")})}};$(function(){coffeeModal.toggleCoffeeModal();coffeeModal.initShowCode();coffeeModal.switchQrCode()});
var moonMenu={smoothBack2Top:function(){window.scroll({top:0,behavior:"smooth"})},smoothBack2Bottom:function(){const offsetHeight=document.documentElement.offsetHeight;const scrollHeight=document.documentElement.scrollHeight;window.scroll({top:scrollHeight-offsetHeight,behavior:"smooth"})},ckBack2Top:function(){$(".icon-up").on("click",function(){moonMenu.smoothBack2Top()})},ckBack2Bottom:function(){$(".icon-down").on("click",function(){moonMenu.smoothBack2Bottom()})},ckShowContent:function(){$(".icon-toc").on("click",function(){$("#moonToc").toggleClass("mm-active")})},initMoonToc:function(){var headerEl="h1,h2,h3,h4,h5,h6",content=".md-content";tocbot.init({tocSelector:"#moonToc",contentSelector:content,headingSelector:headerEl,scrollSmooth:true,isCollapsedClass:"",headingsOffset:0-($("#postHeader").height()+58),hasInnerContainers:false,})},searchBox:function(){$(".icon-search").on("click",function(){$("#searchBox").toggleClass("hidden")});$(".sh-exit").on("click",function(){$("#searchBox").toggleClass("hidden")})},toggleCircle:function(){var $moonDot=$("g.moon-dot");var firstCircle=$moonDot.children("circle:first");var lastCircle=$moonDot.children("circle:last");var cy=$(firstCircle).attr("cy");if(cy==="0"){$(firstCircle).attr("cx","0");$(firstCircle).attr("cy","-.8rem");$(lastCircle).attr("cx","0");$(lastCircle).attr("cy",".8rem")}else{$(firstCircle).attr("cx","-.8rem");$(firstCircle).attr("cy","0");$(lastCircle).attr("cx",".8rem");$(lastCircle).attr("cy","0")}},ckMoonButton:function(){$(".moon-menu-button").on("click",function(){moonMenu.toggleCircle();$(".moon-menu-items").toggleClass("item-ani")})},};$(function(){moonMenu.ckMoonButton();moonMenu.ckBack2Top();moonMenu.ckBack2Bottom();moonMenu.searchBox();var Obj=$("#tocFlag");if(Obj.length!==1){return false}moonMenu.initMoonToc();moonMenu.ckShowContent()});
var hanUtils={getLocalStorage:function(key){var exp=60*60*1000;if(localStorage.getItem(key)){var vals=localStorage.getItem(key);var dataObj=JSON.parse(vals);var isTimed=(new Date().getTime()-dataObj.timer)>exp;if(isTimed){console.log("存储已过期");localStorage.removeItem(key);return null}else{var newValue=dataObj.val}return newValue}else{return null}},isQuotaExceeded:function(e){var quotaExceeded=false;if(e){if(e.code){switch(e.code){case 22:quotaExceeded=true;break;case 1014:if(e.name==="NS_ERROR_DOM_QUOTA_REACHED"){quotaExceeded=true}break}}else{if(e.number===-2147024882){quotaExceeded=true}}}return quotaExceeded},setLocalStorage:function(key,value){var curtime=new Date().getTime();var valueDate=JSON.stringify({val:value,timer:curtime});try{localStorage.removeItem(key);localStorage.setItem(key,valueDate)}catch(e){if(isQuotaExceeded(e)){console.log("Error: 本地存储超过限制");localStorage.clear()}else{console.log("Error: 保存到本地存储失败")}}}};
var tocId="#toc";var flagId="#tocFlag";var post={loadHighlight:function(){var codes=document.querySelectorAll(".md-content pre code");for(var i=0;i<codes.length;i++){var block=codes[i];hljs.highlightBlock(block);$("code.hljs").each(function(i,block){hljs.lineNumbersBlock(block)})}},initViewer:function(){if(document.getElementById("write")){const viewer=new Viewer(document.getElementById("write"),{toolbar:false,})}},getScrollTop:function(){return document.documentElement.scrollTop||document.body.scrollTop},tocScroll:function(event){var Obj=$(flagId);if(Obj.length!==1){return false}var tocFixed=$(tocId);var ObjTop=Obj.offset().top-$(window).height()*0.5;var scrollTop=post.getScrollTop();var postHeaderHeight=$("#postHeader").height();if(scrollTop>postHeaderHeight){tocFixed.show()}else{tocFixed.hide()}var tocEle=document.querySelector(tocId);if(!tocEle||!tocEle.getBoundingClientRect()){return}var tocHeight=tocEle.getBoundingClientRect().height;if(scrollTop>ObjTop-tocHeight*0.5){tocFixed.addClass("toc-right-fixed")}else{tocFixed.removeClass("toc-right-fixed")}event.preventDefault()},scrollTocFixed:function(){window.addEventListener("scroll",post.tocScroll,false)},initToc:function(){var headerEl="h1,h2,h3,h4,h5,h6",content=".md-content";tocbot.init({tocSelector:"#toc",contentSelector:content,headingSelector:headerEl,scrollSmooth:true,headingsOffset:0-$("#postHeader").height()-58,hasInnerContainers:false,});var tocLinks=$(".md-content .toc-link");if(tocLinks){for(var i=0;i<tocLinks.length;i++){var tocLink=tocLinks[i];tocLink.after(document.createElement("span"))}}},removeFirstUL:function(){var post_content=document.getElementById("write");if(!post_content){return}var firstNodeName=post_content.firstElementChild.nodeName;if(firstNodeName==="UL"){$(post_content.firstElementChild).hide()}},};$(function(){post.loadHighlight();post.initViewer();post.scrollTocFixed();post.initToc();post.removeFirstUL()});
var photo={loadGallery:function(){if(document.getElementById("gallery-content")){new Viewer(document.getElementById("gallery-content"),{toolbar:true,})}if(typeof($.fn.justifiedGallery)==="function"){if($(".justified-gallery > p > .gallery-item").length){$(".justified-gallery > p > .gallery-item").unwrap()}$(".justified-gallery").justifiedGallery({rowHeight:230,margins:4})}}};document.addEventListener("DOMContentLoaded",photo.loadGallery);
