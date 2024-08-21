window.markdownitCanvas = function(md) {
    const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;

    md.renderer.rules.fence = function(tokens, idx, options, env, self) {
        let token = tokens[idx];
        if (token) {
            let info = token.info;
            if (info) {
                if (info.startsWith("canvas")) {
                    const canvasRegex = /canvas\(([^)]+)\)/;
                    const match = info.match(canvasRegex);
                    if (match && match[1]) {
                        const attributesString = match[1];
                        const attributePairs = attributesString.split(",");
                        const attributes = {};
                        attributePairs.forEach((pair) => {
                            const [key, value] = pair.trim().split("=");
                            attributes[key.trim()] = value.replace(/^['"]|['"]$/g, "");
                        });
                        let id = attributes.id;
                        if (id) {
                            let context = attributes.context || "2d";
                            let content = token.content || "";
                            const tag = `<canvas ${Object.entries(attributes)
                                .map(([k, v]) => `${k}="${v}"`)
                                .join(" ")}>browser not support canvas</canvas>`;
                            const script = `<script>
                                                (function() {
                                                    // debugger;
                                                    let canvasElement = document.getElementById("${id}");
                                                    if (canvasElement.getContext) {
                                                        let canvas = canvasElement.getContext("${context}");
                                                        canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
                                                        ${content}
                                                    };
                                                })();
                                            </script>`;
                            // const script = `<script> debugger;
                            //                     let canvasElement = document.getElementById("${id}");
                            //                 </script>`;
                            const html = tag + script;
                            return html;
                        }
                    }
                }
            }
        }
        // Make your changes here ...
        // ... then render it using the existing logic
        return defaultFenceRenderer(tokens, idx, options, env, self);
    };
};
