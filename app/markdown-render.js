class Markdown {
    // constructor() {}
    renderMarkdown(bufferInfo) {
        const lines = bufferInfo.lines;
        if (!lines) {
            return false;
        }
        const md = window.markdownit();
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
