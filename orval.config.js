module.exports = {
  betterdle: {
    input: './swagger.json',
    output: {
      mode: 'split',
      target: './src/api/generated/betterdle.ts', // Où générer le code
      schemas: './src/api/generated/model',       // Où mettre les interfaces TS
      client: 'react-query',                      // Générer des hooks TanStack Query
      baseUrl: 'http://localhost:8080',           // URL de ton API
    },
  },
};