class CursorScroll {
    scrollTo(bufferInfo) {
        debugger;
        let cursor = bufferInfo.cursor;
        let line = cursor[1] - 1;
        let dataSourceLine = `[data-source-line="${line}"]`;
        let element = document.querySelector(dataSourceLine);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
}
