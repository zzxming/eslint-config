#!/usr/bin/env node
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import consola from 'consola';
import { vscodeSettings } from './constants';

const updateVscodeSettings = async () => {
  const cwd = process.cwd();

  const dotVscodePath: string = path.join(cwd, '.vscode');
  const settingsPath: string = path.join(dotVscodePath, 'settings.json');

  if (!fs.existsSync(dotVscodePath)) {
    await fsp.mkdir(dotVscodePath, { recursive: true });
  }

  if (!fs.existsSync(settingsPath)) {
    consola.success(`Creating .vscode/settings.json ...`);
    await fsp.writeFile(settingsPath, `{${vscodeSettings}}\n`, 'utf8');
    consola.success(`Created .vscode/settings.json`);
  }
  else {
    consola.success(`Updating .vscode/settings.json ...`);
    let settingsContent = await fsp.readFile(settingsPath, 'utf8');
    settingsContent = settingsContent.trim().replace(/\s*}$/, '');
    settingsContent += settingsContent.endsWith(',') || settingsContent.endsWith('{') ? '' : ',';
    settingsContent += `${vscodeSettings}}\n`;

    await fsp.writeFile(settingsPath, settingsContent, 'utf8');
    consola.success(`Updated .vscode/settings.json`);
  }
};

updateVscodeSettings().catch((error) => {
  consola.error(error);
  process.exit(1);
});
