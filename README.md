# Kosi AI

A multi-mode AI workspace prototype built with Next.js, TypeScript and a custom, API-independent local intelligence script.

## Run locally

    npm install
    npm run dev

Open http://localhost:3000.

## What the local engine does today

The app currently includes 13 focused work modes: chat, research, sports, video, image, voice, code, study, writing, business, documents, music and slides.

The local engine:
- Classifies a prompt into an intent such as planning, comparison, explanation, creation, troubleshooting, decision support or analysis.
- Extracts a small set of explicit constraints such as budget, timeline, audience, location and an API-independent preference.
- Applies mode-specific workflows and practical checklists.
- Labels unavailable capabilities instead of pretending to have fetched data or generated media.
- Keeps the five most recent prompts in browser local storage on the current device. This is not cloud sync or account history.

## Important limitations

Kosi's local engine is a deterministic TypeScript script, not a trained language model. It can route and structure common tasks, but it cannot genuinely understand arbitrary questions, produce original long-form reasoning, browse live sources, or generate images, audio or video. Sports fixtures, injuries, statistics and odds are not live or verified. File upload and document extraction are not active.

This is an intentional API-independent foundation. A genuine model can be plugged in later behind a server-side adapter without putting provider secrets in browser code.

## Planned integration boundaries

- AI text: optional server-side model adapter
- Sports: licensed fixtures and statistics provider
- Video and image: specialised generation providers
- Voice: speech-to-text and text-to-speech providers
- Accounts, synced history and credits: authentication and database layer
- Payments: Nigerian payment provider integration

Never put provider secrets in client-side code or variables prefixed with `NEXT_PUBLIC_`.
