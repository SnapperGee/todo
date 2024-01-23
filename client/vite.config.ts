import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        proxy: {
            "/api": "http://127.0.0.1:3001",
            "/graphql": "http://127.0.0.1:3001"
        }
    }
})
