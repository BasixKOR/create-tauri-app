// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

import { join } from 'path'
import { shell } from '../shell'
import { Recipe } from '../types/recipe'

export const sveltekit: Recipe = {
  shortName: 'svelte',
  descriptiveName: {
    name: 'SvelteKit (https://kit.svelte.dev/)',
    value: 'sveltekit'
  },
  configUpdate: ({ cfg, packageManager }) => ({
    ...cfg,
    distDir: `../public`,
    devPath: 'http://localhost:8080',
    beforeDevCommand: `${
      packageManager.name === 'npm' ? 'npm run' : packageManager.name
    } dev`,
    beforeBuildCommand: `${
      packageManager.name === 'npm' ? 'npm run' : packageManager.name
    } build`
  }),
  preInit: async ({ cwd, cfg, packageManager, ci }) => {
    await packageManager.create('svelte', [cfg.appName], { cwd })
  },
  postInit: async ({ cfg, packageManager }) => {
    console.log(`
    Your installation completed.

    $ cd ${cfg.appName}
    $ ${packageManager.name} install
    $ ${
      packageManager.name === 'npm' ? 'npm run' : packageManager.name
    } tauri dev
    `)

    return await Promise.resolve()
  }
}
