import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
  port:5173,
  proxy:{
    "/api":{
      target:"https://gwk8h3dw-8080.inc1.devtunnels.ms/",
      changeOrigin:true,
      secure:false,
      rewrite:(path)=>path
    }
  }
}
})
