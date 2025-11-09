# Husky + TypeScript + Jest + ESLint tutorial

This repository shows a minimal setup to enforce quality checks before pushing code using Husky. It initializes Husky on install, runs unit tests and lint on every push, and uses a tiny TDD example in TypeScript.

## What you get

* TypeScript project with Jest for tests
* ESLint for linting
* Husky hook that blocks `git push` when tests or lint fail
* A small example function and its test

Repository: `https://github.com/andmarruda/husky-tutorial`

## Project structure

```
.husky/
  _/
  pre-push
src/
  mathOperations.ts
tests/
  mathOperations.test.ts
.eslintrc config files
jest.config.js
tsconfig.json
package.json
init-husky.js
```

## Example code

`src/mathOperations.ts`

```ts
export const sumAll = (...numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc + curr, 0);
```

`tests/mathOperations.test.ts`

```ts
import { describe, it, expect } from '@jest/globals';
import { sumAll } from '../src/mathOperations';

describe('Testing sumAll function', () => {
  it('Test sumAll with positive numbers', () => {
    expect(sumAll(1, 2, 3, 4)).toBe(10);
  });
});
```

## Install and run

```bash
# clone
git clone https://github.com/andmarruda/husky-tutorial
cd husky-tutorial

# install deps and auto-init Husky
npm install

# run tests on demand
npm test

# run lint on demand
npm run lint
```

## Husky auto setup on install

The repository uses a postinstall script that prepares Husky automatically. The script calls `npx husky init` only when the repo is not already configured.

`init-husky.js`

```js
import { execSync } from 'child_process';
import { existsSync } from 'fs';

if (!existsSync('.husky/_')) {
  console.log('[setup] Initializing Husky hooks...');
  execSync('npx husky init', { stdio: 'inherit' });
} else {
  console.log('[setup] Husky already configured, skipping init.');
}
```

`package.json` relevant parts

```json
{
  "scripts": {
    "test": "jest",
    "lint": "eslint . --ext .ts",
    "postinstall": "node ./init-husky.js",
    "prepare": "husky"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@jest/globals": "^30.2.0",
    "@types/jest": "^30.0.0",
    "@typescript-eslint/eslint-plugin": "^8.46.3",
    "@typescript-eslint/parser": "^8.46.3",
    "eslint": "^9.39.1",
    "globals": "^16.5.0",
    "husky": "^9.1.7",
    "jest": "^30.2.0",
    "jiti": "^2.6.1",
    "ts-jest": "^29.4.5",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.46.3"
  }
}
```

## Pre-push hook

This hook runs on every `git push`. It fails the push if tests or lint fail.

`.husky/pre-push`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

set -e

echo "[pre-push] Running unit tests..."
npm run -s test -- --ci --passWithNoTests

echo "[pre-push] Running ESLint..."
npm run -s lint

echo "[pre-push] All checks passed ✅"
```

Tip: keep the script POSIX compatible. `set -e` is enough here.

## ESLint and Jest basics

* ESLint config extends the recommended sets and targets TypeScript files
* Jest uses `ts-jest` to run tests written in TypeScript

Run everything locally

```bash
npm run lint
npm test
```

## How to use this as a TDD starter

1. Write a failing test in `tests/`
2. Implement the function in `src/`
3. Run `npm test` until green
4. Commit changes
5. Push the branch. Husky will run tests and lint. The push proceeds only if both pass.

---

# Tutorial Husky + TypeScript + Jest + ESLint

Este repositório mostra um setup mínimo para garantir qualidade antes de fazer push usando Husky. Ele inicializa o Husky no install, executa testes e lint em todo push e traz um exemplo simples em TypeScript para TDD.

## O que está incluso

* Projeto TypeScript com Jest para testes
* ESLint para linting
* Hook do Husky que bloqueia `git push` quando testes ou lint falham
* Uma função de exemplo com seu teste

Repositório: `https://github.com/andmarruda/husky-tutorial`

## Estrutura do projeto

```
.husky/
  _/
  pre-push
src/
  mathOperations.ts
tests/
  mathOperations.test.ts
.eslintrc arquivos de config
jest.config.js
tsconfig.json
package.json
init-husky.js
```

## Código de exemplo

`src/mathOperations.ts`

```ts
export const sumAll = (...numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc + curr, 0);
```

`tests/mathOperations.test.ts`

```ts
import { describe, it, expect } from '@jest/globals';
import { sumAll } from '../src/mathOperations';

describe('Testing sumAll function', () => {
  it('Test sumAll with positive numbers', () => {
    expect(sumAll(1, 2, 3, 4)).toBe(10);
  });
});
```

## Instalação e uso

```bash
# clonar
git clone https://github.com/andmarruda/husky-tutorial
cd husky-tutorial

# instalar dependências e inicializar Husky automaticamente
npm install

# rodar testes quando quiser
npm test

# rodar lint quando quiser
npm run lint
```

## Husky automático no postinstall

O repositório usa um script de postinstall que prepara o Husky automaticamente. Ele chama `npx husky init` apenas se o repositório ainda não estiver configurado.

`init-husky.js`

```js
import { execSync } from 'child_process';
import { existsSync } from 'fs';

if (!existsSync('.husky/_')) {
  console.log('[setup] Initializing Husky hooks...');
  execSync('npx husky init', { stdio: 'inherit' });
} else {
  console.log('[setup] Husky already configured, skipping init.');
}
```

`package.json` trechos relevantes

```json
{
  "scripts": {
    "postinstall": "node init-husky.js",
    "lint": "eslint . --ext .ts",
    "test": "jest --passWithNoTests"
  },
  "devDependencies": {
    "@types/jest": "...",
    "eslint": "...",
    "jest": "...",
    "ts-jest": "...",
    "typescript": "..."
  }
}
```

## Hook de pre-push

Este hook roda em todo `git push`. O push é bloqueado se testes ou lint falharem.

`.husky/pre-push`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

set -e

echo "[pre-push] Running unit tests..."
npm run -s test -- --ci --passWithNoTests

echo "[pre-push] Running ESLint..."
npm run -s lint

echo "[pre-push] All checks passed ✅"
```

Dica: mantenha o script compatível com POSIX. `set -e` é suficiente aqui.

## ESLint e Jest

* ESLint estende recomendações e foca em arquivos TypeScript
* Jest usa `ts-jest` para executar testes em TypeScript

Execute localmente

```bash
npm run lint
npm test
```

## Como usar com TDD

1. Escreva um teste que falha em `tests/`
2. Implemente a função em `src/`
3. Rode `npm test` até ficar verde
4. Faça o commit
5. Faça push. O Husky executa testes e lint. O push só prossegue se tudo passar.

Pronto. Este exemplo serve como base para ensinar a equipe a proteger o repositório com checks rápidos e previsíveis.
