import { NextRequest, NextResponse } from 'next/server';
import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod';

const createEntityTool = tool({
  name: 'createEntity',
  description: 'Create an A-Frame entity. Position is an "x y z" string.',
  parameters: z.object({
    shape: z.enum(['box', 'sphere', 'cylinder', 'plane']),
    color: z.string().default('#AAA'),
    position: z.string().default('0 1.6 -2')
  }),
  execute: async (input) => input,
});

const vrAgent = new Agent({
  name: 'vrBuilder',
  instructions: `You help craft a VR scene. Use metaphors: shapes are seeds, colors are paints, position is where they sprout. Always call createEntity with shape, color and position when describing new objects.`,
  tools: [createEntityTool],
  outputType: z.object({ shape: z.string(), color: z.string(), position: z.string() })
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const result = await run(vrAgent, prompt);
  return NextResponse.json({ entity: result.finalOutput });
}
