import type { Config } from 'tailwindcss'

const config: Config = {
  
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    daisyui:{
      themes:[
        'light',
        'dark'
      ]
    },
    // Rest of the configuration
}
export default config
