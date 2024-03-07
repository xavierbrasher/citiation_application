"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_base_config_1 = require("./vite.base.config");
// https://vitejs.dev/config
exports.default = (0, vite_1.defineConfig)((env) => {
    const forgeEnv = env;
    const { forgeConfigSelf } = forgeEnv;
    const define = (0, vite_base_config_1.getBuildDefine)(forgeEnv);
    const config = {
        build: {
            lib: {
                entry: forgeConfigSelf.entry,
                fileName: () => '[name].js',
                formats: ['cjs'],
            },
            rollupOptions: {
                external: vite_base_config_1.external,
            },
        },
        plugins: [(0, vite_base_config_1.pluginHotRestart)('restart')],
        define,
        resolve: {
            // Load the Node.js entry.
            mainFields: ['module', 'jsnext:main', 'jsnext'],
        },
    };
    return (0, vite_1.mergeConfig)((0, vite_base_config_1.getBuildConfig)(forgeEnv), config);
});
//# sourceMappingURL=vite.main.config.js.map