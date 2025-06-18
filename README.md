# Type-Safe Full-Stack E-commerce Application

A complete example of building a type-safe full-stack application using shared TypeScript types between SvelteKit frontend and AdonisJS backend.

## Architecture

This monorepo contains three packages:

- **`packages/shared`** - Shared TypeScript types and Zod validation schemas
- **`packages/api`** - AdonisJS backend API with type-safe controllers
- **`packages/web`** - SvelteKit frontend with type-safe API client

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Setup database:**
   ```bash
   cd packages/api
   node ace make:migration create_orders_table
   node ace migration:run
   ```

3. **Start development servers:**
   ```bash
   pnpm dev
   ```

   This will start:
   - API server on http://localhost:3333
   - Web server on http://localhost:5173

## Key Features

- **Type Safety Across the Stack** - Shared types ensure frontend and backend stay in sync
- **Runtime Validation** - Zod schemas validate data at runtime
- **Compile-time Errors** - TypeScript catches mismatches during development
- **Perfect Autocomplete** - IDE knows your entire API surface
- **Fearless Refactoring** - Change once, TypeScript guides you everywhere else

## Project Structure

```
my-app/
├── packages/
│   ├── shared/           # Shared types and validation
│   │   ├── src/
│   │   │   ├── schemas/
│   │   │   │   └── order.ts
│   │   │   ├── types/
│   │   │   │   └── api.ts
│   │   │   └── index.ts
│   │   └── package.json
│   ├── api/              # AdonisJS backend
│   │   ├── app/
│   │   │   ├── controllers/
│   │   │   └── models/
│   │   ├── database/
│   │   │   └── migrations/
│   │   └── package.json
│   └── web/              # SvelteKit frontend
│       ├── src/
│       │   ├── lib/
│       │   │   ├── api/
│       │   │   ├── components/
│       │   │   └── utils/
│       │   └── routes/
│       └── package.json
├── package.json
└── pnpm-workspace.yaml
```

## Benefits

- **Prevents Runtime Errors** - Catch type mismatches at compile time
- **Improved Developer Experience** - Perfect autocomplete and instant error detection
- **Faster Onboarding** - New developers get full API documentation through types
- **Confident Refactoring** - Change once, update everywhere automatically
- **Better Code Reviews** - Focus on logic instead of type correctness

## Technologies Used

- **Frontend**: SvelteKit, TypeScript, Vite
- **Backend**: AdonisJS 6, TypeScript, Lucid ORM
- **Validation**: Zod
- **Package Manager**: PNPM (with workspaces)
- **Database**: SQLite (easily configurable for PostgreSQL/MySQL)

## Development Workflow

1. Define your data structures in `packages/shared/src/schemas/`
2. Export types from the schemas using `z.infer<>`
3. Use the shared types in both frontend and backend
4. Enjoy automatic type safety and perfect IDE support!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all types are properly shared and validated
5. Submit a pull request

## License

MIT
