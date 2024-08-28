class Render {
    render(bufferInfo) {
        debugger
        let { html, css} = bufferInfo;
        document.getElementById('marp-css').innerHTML = css;  
        document.getElementById('marp-content').innerHTML = html;
        return true;
    }
}
