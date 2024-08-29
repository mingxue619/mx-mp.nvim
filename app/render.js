class Render {
    render(info) {
        let type = info.type;
        if (type === "cursor" || type === "markdown") {
            return true;
        }
        if (type === "html") {
            let { html, css } = info;
            document.getElementById("marp-css").innerHTML = css;
            document.getElementById("marp-content").innerHTML = html;
            return true;
        }
        return true;
    }
}
