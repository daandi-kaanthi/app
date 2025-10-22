# 2048 Game
This repository contains a React implementation of the popular puzzle game 2048. The game challenges players to combine numbered tiles on a grid to reach the 2048 tile through strategic moves.

## About the Game
2048 is a sliding block puzzle game where players combine tiles with the same numbers by moving them in four directions (up, down, left, right). When two tiles with the same number touch, they merge into one tile with double the value. The objective is to create a tile with the number 2048.

## Technology Stack
This project is built using:
- **React** – For building the UI
- **TypeScript** – For type safety
- **Vite** – For fast development and bundling
- **TailwindCSS** – For styling
- **i18next** – For language support (optional)
- ESLint – For maintaining code quality

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm (comes with Node.js) or Yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Shubhamkunwar10/2048

cd 2048-game
```
2. Install dependencies:
```bash
npm install
# or
yarn
```

## Running the Development Server

Start the Vite development server with hot reload:

```bash
npm run dev
# or
yarn dev
```

Open your browser at http://localhost:5173 (Vite will show the correct port). Changes in code will automatically reload the game.

## Building for Production
To build the project for production:

```bash
npm run build
# or
yarn build

```
The optimized files will be in the dist folder.

### Previewing the Production Build

You can preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
# or
yarn lint
```

?lang=hi at each will udpate langugae

Update: Upload to s3 => cloudfront create invalidation