class Markdown {
    // constructor() {}
    renderMarkdown(bufferInfo) {
        const content = bufferInfo.content;
        if (!content) {
            return false;
        }
        const md = window.markdownit();
        const newContent = content.join("\n");
        if (this.content === newContent) {
            return;
        }
        this.content = newContent;
        const newHtml = md.use(window.markdownitSub).render(newContent);
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = newHtml;
    }
}
