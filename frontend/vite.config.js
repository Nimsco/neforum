import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {
                            name: 'react-core',
                            test: /node_modules[\\/](react|react-dom)[\\/]/,
                        },
                        {
                            name: 'react-router',
                            test: /node_modules[\\/](react-router|react-router-dom)[\\/]/,
                        },
                        {
                            name: 'vendor-ui',
                            test: /node_modules[\\/](react-toastify|react-loading-indicators|axios)[\\/]/,
                        },
                        {
                            name: 'vendor',
                            test: /node_modules[\\/]/,
                        },
                    ],
                },
            },
        },
    },
});
