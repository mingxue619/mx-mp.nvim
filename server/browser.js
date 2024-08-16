import childProcess from "child_process";
import os from "os";

export default class Browser {
    static open(browser, url) {
        return childProcess.spawn(browser, [url], {
            shell: false,
            detached: true,
        });
    }
}
