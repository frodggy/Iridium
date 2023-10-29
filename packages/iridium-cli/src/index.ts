#! /usr/bin/env node

import sade from 'sade'

import build from './commands/build.js'

const cli = sade('lithium')

cli.command("build").describe('Build production ready static files')
    .action(build)
    .option(
        '-o, --output',
        'Change output directory of your `build` command. (defaults to `./build`)'
    )

cli.parse(process.argv)