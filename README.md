# About
this project assignment for unit testing with nextjs

## installer package

1. npm install formik --save
2. npm install yup
3. npm install axios

## installer for unit testing

1. npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
2. npm init jest@latest (for jest config) and choose:
    - ✔ Would you like to use Jest when running "test" script in "package.json"? … yes
    - ✔ Choose the test environment that will be used for testing › jsdom (browser-like)
    - ✔ Do you want Jest to add coverage reports? … yes
    - ✔ Which provider should be used to instrument code for coverage? › babel
    - ✔ Automatically clear mock calls and instances between every test? … no
3. npm i -D ts-node
4. npm i --save-dev @types/jest
5. npm install --save-dev @babel/preset-typescript
6. npm install --save-dev @babel/preset-typescript @babel/preset-react
7. npm i -D @babel/preset-env
8. npm install @testing-library/jest-dom --save-dev

## Setting config file for testing

1. create file babel.config.js and add this code
```javascript
module.exports = {
  presets: [`@babel/preset-env`, `@babel/preset-react`]
};
```

2. create or change file into jest.config.ts and add this code
```javascript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
     '^@/components/(.*)$': '<rootDir>/components/$1',
  },
    
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

3. or you can copy this file package.json and paste to your package.json (dont forget to change the name of your project, version and npm install after that)
```javascript
{
  "name": "module-5-isnendyankp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
  "dependencies": {
    "axios": "^1.6.5",
    "formik": "^2.4.5",
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "yup": "^1.3.3"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.23.9",
    "@babel/preset-react": "^7.23.3",
    "@babel/preset-typescript": "^7.23.3",
    "@testing-library/jest-dom": "^6.3.0",
    "@testing-library/react": "^14.1.2",
    "@types/jest": "^29.5.11",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  }
}
```

4. matching tsconfig.json into this code
```javascript
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Add file for npm run dev after testing

1. create file next.config.js and add this code
```javascript
module.exports = {
  experimental: {
    forceSwcTransforms: true,
  },
}
```

## Deploy on netlify

https://pokemonnextjs.netlify.app/