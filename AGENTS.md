# Repo Guidelines

This repository demonstrates multi‑agent flows with Realtime voice agents. We now maintain a VR showcase using A‑Frame and `@openai/agents` on the server.

## Local Development
- Run `npm install` after updating dependencies.
- Use `npm run build` to ensure the Next.js app compiles before committing.

## VR Agent Showcase
- New API route `/api/vr-agent` exposes an example of using `@openai/agents` to translate text prompts into A‑Frame entities.
- Client code under `src/app/vr/` renders these entities. Each prompt results in a new primitive added to the scene.
- Shapes, colors and positions returned by the agent are metaphors for basic data structures in this world.

Future work can expand the agent's tools to animate or manipulate objects and integrate more complex workflows.
