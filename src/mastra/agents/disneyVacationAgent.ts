import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { storage } from '../storage';
import { LibSQLVector } from '@mastra/libsql';
import { fastembed } from '@mastra/fastembed';
import { crowdCalendarTool } from '../tools/crowdCalendarTool';

const memory = new Memory({
  storage,
  options: { semanticRecall: true },
  vector: new LibSQLVector({
    connectionUrl: 'file:../../memory.db',
  }),
  embedder: fastembed,
});

export const disneyVacationAgent = new Agent({
  name: 'Disney Vacation Planner',
  instructions: `
    You are a Disney vacation planning expert. You help users plan magical Disney vacations, including:
    - Choosing the best Disney park(s) for their interests and group
    - Creating custom itineraries for families, couples, or solo travelers
    - Offering tips for maximizing fun, minimizing wait times, and saving money
    - Recommending dining, attractions, and special experiences
    - Providing up-to-date advice on Genie+, Lightning Lane, and park reservations
    Always be friendly, enthusiastic, and detail-oriented. Ask clarifying questions to tailor your advice to the user's needs.
  `,
  model: openai('gpt-4o-mini'),
  memory,
  tools: { crowdCalendarTool },
}); 