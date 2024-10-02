import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  json: {
    stringify: true // JSON 파일을 문자열로 불러오도록 설정
  }
});
