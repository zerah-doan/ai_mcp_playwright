import { register } from 'ts-node';

export default async function globalSetup(): Promise<void> {
    register({
        transpileOnly: true,
        compilerOptions: {
            module: 'commonjs',
            resolveJsonModule: true,
            allowJs: true,
            baseUrl: '.',
            paths: {
                '@utils/*': ['utils/*'],
                '@pages/*': ['pages/*'],
                '@tests/*': ['tests/*'],
                '@config/*': ['config/*']
            }
        }
    });
}