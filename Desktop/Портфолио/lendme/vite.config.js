import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				// импортируем переменные
				additionalData: `@import "./src/app/styles/variables/variables.scss"; 
        @import "./src/app/styles/mixins/mixins.scss"; `, // импортируем миксины
			},
		},
	},
});
