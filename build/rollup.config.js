import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import resolve from 'rollup-plugin-node-resolve';
import typescript from "rollup-plugin-typescript2";

export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'HijriCalender',
        exports: 'named',
        globals: {
            'moment-hijri': 'moment-hijri',
            'vue-popperjs' : 'vue-popperjs',
            'vue-property-decorator': 'vue-property-decorator',
            'vue-class-component': 'vue-class-component',
        },
    },
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true,
            clean: true,
            objectHashIgnoreUnknownHack: true,
        }),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
    external: ['moment-hijri' , 'vue-popperjs', 'vue-property-decorator', 'vue-class-component']
};