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
            return;
        }
        this.lines = lines;
        this.content = newContent;
        const newHtml = md.use(window.markdownitSub).use(window.markdownitSup).use(window.markdownitInjectLinenumbers).render(newContent);
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = newHtml;
    }
}
