export default class UrlFilter {
    constructor() {}

    static toRealPath(pathname) {
        let real_path = "app/app.html";
        let urls = pathname.split("/");
        if (urls[1]) {
            if (urls[1] == "page") {
                return real_path;
            } else if (urls[1] == "app") {
                urls.shift();
                real_path = urls.join("/");
            } else if (urls[1] == "node_modules") {
                urls.shift();
                real_path = urls.join("/");
            } else {
                real_path = "app" + pathname;
            }
        }
        return real_path;
    }
}
