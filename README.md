# Kosi AI

A multi-mode AI workspace prototype built with Next.js, TypeScript and a custom local interaction engine.

## Run locally

    npm install
    npm run dev

Open http://localhost:3000.

## Important preview status

This first commit is an interactive product shell. The custom lib/kosi-engine.ts routes mode-specific requests and returns honest local-preview guidance. It does not call an AI API, provide live sports data, render video/images, or process uploaded documents yet. Those capabilities are designed as plug-in integrations so provider keys can remain server-side and be added later without rebuilding the interface.

## Planned integration boundaries

- AI text: server-side model adapter
- Sports: licensed fixtures/statistics provider
- Video and image: specialised generation providers
- Voice: speech-to-text and text-to-speech providers
- Accounts, history and credits: authentication and database layer
- Payments: Nigerian payment provider integration

Never put provider secrets in client-side code or variables prefixed with NEXT_PUBLIC_.
