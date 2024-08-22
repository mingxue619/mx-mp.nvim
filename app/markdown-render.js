class Markdown {
    renderMarkdown(bufferInfo) {
        const lines = bufferInfo.lines;
        if (!lines) {
            return false;
        }
        const md = window.markdownit({
            html: true,
            xhtmlOut: true,
            breaks: false,
            langPrefix: "language-",
            linkify: true,
            typographer: true,
            quotes: "“”‘’",
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre><code class="hljs">' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + "</code></pre>";
                    } catch (__) {}
                }

                return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>";
            },
        });
        const newContent = lines.join("\n");
        if (this.content === newContent) {
            return true;
        }
        this.lines = lines;
        this.content = newContent;
       
        const newHtml = md.use(window.markdownitCanvas).use(window.markdownitSub).use(window.markdownitSup).use(window.markdownitInjectLinenumbers).render(newContent);
        // console.log(Object.keys(md.renderer.rules));
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = newHtml;
        let scripts = contentElement.getElementsByTagName("script");
        Array.from(scripts).forEach(function (script) {
            var scriptElement = document.createElement("script");
            scriptElement.textContent = script.textContent || script.innerText || "";
            document.body.appendChild(scriptElement);
            // setTimeout(function () {
            //     document.body.removeChild(newScript);
            // }, 0);
        });
        return true;
    }
}
