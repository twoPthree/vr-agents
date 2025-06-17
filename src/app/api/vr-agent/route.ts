import { NextRequest, NextResponse } from 'next/server';
import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod';

const createEntityTool = tool({
  name: 'createEntity',
  description:
    'Create an A-Frame entity. Position is an "x y z" string. Optionally provide an animation component.',
  parameters: z.object({
    shape: z.enum(['box', 'sphere', 'cylinder', 'plane']),
    color: z.string().default('#AAA'),
    position: z.string().default('0 1.6 -2'),
    animation: z.string().nullable(),
  }),
  execute: async (input) => input,
});

const vrAgent = new Agent({
  name: 'vrBuilder',
  instructions: `You help craft a VR scene. Use metaphors: shapes are seeds, colors are paints, position is where they sprout. To make an object move, set the animation string. Always call createEntity with shape, color, position, and optional animation when describing new objects.`,
  tools: [createEntityTool],
  outputType: z.object({
    shape: z.string(),
    color: z.string(),
    position: z.string(),
    animation: z.string().nullable(),
  })
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const result = await run(vrAgent, prompt);
  return NextResponse.json({ entity: result.finalOutput });
}
