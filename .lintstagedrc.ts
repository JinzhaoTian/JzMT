import type { Config } from 'lint-staged';
import path from 'path';

const buildEslintCommand = (filenames: string[]): string =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`;

const config: Config = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write']
};

export default config;
