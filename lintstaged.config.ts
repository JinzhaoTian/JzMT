import { Config } from 'lint-staged';
import path from 'path';

const buildEslintCommand = (filenames: string[]): string =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`;

const config: Config = {
    // 为 js, jsx, ts, tsx 文件添加 eslint 命令
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],

    // 为其他类型的文件运行 prettier 格式化
    '**/*.{js,jsx,tsx,ts,less,md,json}': ['prettier --write']
};

export default config;
