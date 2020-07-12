<#include "module/macro.ftl">
<@layout title="${sheet.title!} | ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}">
    <main class="mx-auto" id="container">
        <header class="bg-cover post-cover">
            <#if settings.links_patternimg?? && settings.links_patternimg!=''>
                <div class="w-screen cover-bg">
                    <img src="${settings.links_patternimg!}" class="z-auto"
                         alt="${sheet.title!}">
                </div>
            <#else>
                <div class="placeholder-bg">
                </div>
            </#if>
            <div class="cover-content flex justify-center">
                <!-- 封面内容 -->
                <div class="inner flex flex-col justify-center">
                    <p class="cover-title text-base md:text-4xl lg:text-4xl xl:text-5xl">${sheet.title!}</p>
                </div>
            </div>
        </header>
        <div class="container mx-auto md-content px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd" id="sheetContent">
            ${sheet.formatContent!}
        </div>

        <div class="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd">
            <#include "module/comment.ftl">
            <#if is_post??>
                <@comment post,"post" />
            <#elseif is_sheet??>
                <@comment sheet,"sheet" />
            </#if>
        </div>
    </main>

</@layout>
