<#list posts.content?sort_by("visits") as post>
    <#if post_index==4><#break></#if>
    <div class="popular-thumb xs:mt-4">
        <a href="${post.fullPath!}">
            <img width="300" height="200"
                 src="${post.thumbnail}"
                 alt=""> </a>
        <div class="popular-content popular-middle">
            <div class="entry-content">
                <h2 class="entry-title"><a href="${post.fullPath!}">${post.title}</a>
                </h2>
                <span class="entry-date popular-meta">${post.createTime?string("yyyy年MM月dd日")}</span>
                <a href="${post.fullPath!}"><i class="iconfont icon-yuedu"></i></a>
            </div>
        </div>
    </div>
</#list>
