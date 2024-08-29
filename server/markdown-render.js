import { Marp } from "@marp-team/marp-core";

// Convert Markdown slide deck into HTML and CSS
export default class MarkdownRender {
    constructor() {
        // this.marp = new Marp();
        this.marp = new Marp({
            markdown: {
                html: true, // Enable HTML tags
                breaks: true, // Convert line breaks into `<br />`
            },
        });
    }

    renderMarkdown(bufferInfo) {
        debugger;
        const lines = bufferInfo.lines;
        if (!lines) {
            bufferInfo.html = "";
            bufferInfo.css = "";
            return bufferInfo;
        }
        const newContent = lines.join("\n");
        if (this.content != newContent) {
            const { html, css } = this.marp.render(newContent);
            this.html = html;
            this.css = css;
        }
        bufferInfo.html = this.html;
        bufferInfo.css = this.css;
        return bufferInfo;
    }
}
