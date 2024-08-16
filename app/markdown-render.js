class Markdown {
    escape(str) {
        // escape html content
        const d = document.createElement("div");
        d.appendChild(document.createTextNode(str));
        return d.innerHTML;
    }

    // constructor() {}
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
                        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
                    } catch (__) {}
                }

                // escape html content
                const d = document.createElement("div");
                d.appendChild(document.createTextNode(str));
                return `<pre class="hljs"><code>${d.innerHTML}</code></pre>`;
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
