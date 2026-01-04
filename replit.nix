run = "npx concurrently \"npm run dev\" \"npm run server\""
entrypoint = "index.tsx"

[modules]
modules = ["nodejs-20"]

[nix]
channel = "stable-24_05"

[deployment]
run = ["npm", "run", "build"]

ports = [
  { localPort = 3000, externalPort = 80 },
  { localPort = 5000, externalPort = 5000 }
]
