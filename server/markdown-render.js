import { Marp } from "@marp-team/marp-core";

// Convert Markdown slide deck into HTML and CSS
export default class MarkdownRender {
    constructor() {
        this.marp = new Marp();
    }

    renderMarkdown(bufferInfo) {
        debugger
        const { html, css } = marp.render("# Hello, marp-core!");
        bufferInfo.html = html;
        bufferInfo.css = css;
        return bufferInfo;
    }
}
