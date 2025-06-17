# Repo Guidelines

This repository demonstrates multi‑agent flows with Realtime voice agents. We now maintain a VR showcase using A‑Frame and `@openai/agents` on the server.

## Local Development
- Run `npm install` after updating dependencies.
- Use `npm run build` to ensure the Next.js app compiles before committing.

## VR Agent Showcase
- API route `/api/vr-agent` uses `@openai/agents` to translate text prompts into A‑Frame entities.
- Client code under `src/app/vr/` renders these entities. Each prompt adds a new primitive to the scene.
- Shapes, colors and positions returned by the agent are metaphors for basic data structures in this world.
- Entities may include an `animation` component to showcase simple movement.

Future iterations can expand the agent's tools to manipulate existing objects and orchestrate more complex flows.
