window.markdownitCanvas = function (md) {
    const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;

    md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        let token = tokens[idx];
        if (token && token.info) {
            let info = token.info;
            if (info.startsWith("canvas")) {
                const attributes = {};
                const canvasRegex = /canvas\(([^)]+)\)/;
                const match = info.match(canvasRegex);
                if (match && match[1]) {
                    const attributesString = match[1];
                    const attributePairs = attributesString.split(",");
                    attributePairs.forEach((pair) => {
                        const [key, value] = pair.trim().split("=");
                        attributes[key.trim()] = value.replace(/^['"]|['"]$/g, "");
                    });
                }
                let id = attributes.id;
                if (!id) {
                    id =
                        "canvas-uuid-" +
                        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                            var r = (Math.random() * 16) | 0,
                                v = c == "x" ? r : (r & 0x3) | 0x8;
                            return v.toString(16);
                        });
                    attributes["id"] = id;
                }
                let context = attributes.context || "2d";
                let content = token.content || "";
                let canvasAttribute = Object.entries(attributes)
                    .map(([k, v]) => `${k}="${v}"`)
                    .join(" ");
                const tag = `
                            <canvas class="canvas" ${canvasAttribute}>
                                browser not support canvas
                            </canvas>`;
                const script = `
                               <script>
                                   (function() {
                                       // debugger;
                                       let element = document.getElementById("${id}");
                                       if (element.getContext) {
                                           let canvas = element.getContext("${context}");
                                           canvas.clearRect(0, 0, element.width, element.height);
                                           ${content}
                                       };
                                   })();
                               </script>`;
                const html = tag + script;
                return html;
            }
        }
        return defaultFenceRenderer(tokens, idx, options, env, self);
    };
};
