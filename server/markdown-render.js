import { Marp } from "@marp-team/marp-core";

// Convert Markdown slide deck into HTML and CSS
export default class MarkdownRender {
    constructor() {
        this.marp = new Marp();
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
            // 2. Add theme CSS
            const theme = `
            /* @theme example */
            
            section {
              background-color: #369;
              color: #fff;
              font-size: 30px;
              padding: 40px;
            }
            
            h1,
            h2 {
              text-align: center;
              margin: 0;
            }
            
            h1 {
              color: #8cf;
            }
            `
            this.marp.themeSet.default = this.marp.themeSet.add(theme)
            const { html, css } = this.marp.render(newContent);
            this.html = html;
            this.css = css;
        }
        bufferInfo.html = this.html;
        bufferInfo.css = this.css;
        return bufferInfo;
    }
}
