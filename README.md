# React Boilerplate

This is my simple boilerplate code for react.

Stack:
* React
* Sass
* Expressjs

<br>

## Development

### 1. Download

```bash
git clone https://github.com/Hunkoys/vite-react-sass.git your_app_name
```

You will now have a *your_app_name* folder.

Replace *your_app_name* with any name you want.

### 2. Setup

Open a terminal in *your_app_name* folder.

```bash
npm i
```

### 3. Run it!

```bash
npm run dev
```

You'll then be given a link. Type it in your prefered browser to preview changes on your code.

<br>


## Deploy

### 1. Build the production code.
```bash
npm run build
```

### 2. Copy production files.

These are the files you need to serve your app.

```
📄 package.json
📄 package-lock.json
📁 output
```

### 3. Install dependencies.
Open a terminal in the copied files' folder and run these commands.

**Windows Powershell**
```bash
$env:NODE_ENV = 'production' && npm i
```

**Linux - Debian**
```bash
NODE_ENV=production npm i
```

### 4. Serve!
```bash
node output/server.js
```