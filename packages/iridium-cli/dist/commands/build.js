import { remove } from "fs-extra";
import * as ora from "ora";
import esbuild from 'esbuild';
import { join, resolve } from "path";
import { existsSync } from 'fs';
export default async function ({ output = "build" }) {
    await remove(output);
    process.env.NODE_ENV = 'production';
    const spinner = ora.default('Building production build...').start();
    try {
        await build(output);
        spinner.succeed('Built successfully...');
    }
    catch (err) {
        // @ts-ignore
        spinner.fail(err);
        throw err;
    }
}
async function build(output) {
    const basedir = resolve(output);
    let entry = "";
    if (existsSync("./src/index.js")) {
        entry = "./src/index.js";
    }
    else if (existsSync("./src/index.ts")) {
        entry = "./src/index.ts";
    }
    let service = await esbuild.build({
        entryPoints: [entry],
        outfile: join(basedir, "app.js"),
        bundle: true,
        platform: 'node',
        format: 'cjs',
        loader: {
            '.js': 'jsx',
            '.ts': 'tsx'
        },
        jsxFactory: 'Dhow.el',
        jsxFragment: 'Dhow.fragment',
    });
}
