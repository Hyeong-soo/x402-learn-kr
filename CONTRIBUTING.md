# Contributing to x402-for-opensource

Thank you for your interest in contributing to x402-for-opensource! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies for the component you want to work on

### x402-docs (Next.js App)

```bash
cd x402-docs
npm install
npm run dev
```

### x402-oss-worker (Cloudflare Worker)

```bash
cd x402-oss-worker
npm install
npm run dev
```

## Development Workflow

1. Create a new branch for your feature or fix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes locally
   ```bash
   # For x402-docs
   cd x402-docs && npm run build

   # For x402-oss-worker
   cd x402-oss-worker && npm run typecheck
   ```

4. Commit your changes with a clear message
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. Push to your fork and submit a pull request

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Code Style

- Use TypeScript for all new code
- Follow the existing code style in the project
- Run linting before submitting PRs

## Pull Request Process

1. Ensure your PR description clearly describes the problem and solution
2. Link any related issues
3. Make sure all tests pass
4. Request review from maintainers

## Questions?

If you have questions, feel free to open an issue for discussion.
