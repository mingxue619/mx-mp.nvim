export default class UrlFilter {
    constructor() {
    }

    static toRealPath(pathname) {
        if(pathname.startsWith('/page/')) {
            let real_path = 'app/app.html';
            return  real_path;
        }
    }
}
