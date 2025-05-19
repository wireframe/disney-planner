import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import fetch from 'node-fetch';

export const crowdCalendarTool = createTool({
  id: 'crowd-calendar',
  description: 'Provides crowd level predictions for Disney parks on a given date.',
  inputSchema: z.object({
    park: z.string().describe('The name of the Disney park (e.g., Magic Kingdom, Disneyland, EPCOT, etc.)'),
    date: z.date().describe('The date to check crowd levels for, in YYYY-MM-DD format'),
  }),
  execute: async (input) => {
    const { park, date } = input.context;
    const crowdLevel = await getCrowdLevel(park, new Date(date));
    const explanations: Record<typeof crowdLevel, string> = {
      1: 'Light Crowds (minimal lines)',
      2: 'Below Average Crowds',
      3: 'Average Crowds',
      4: 'Above Average Crowds',
      5: 'Heavy Crowds (long lines)',
    };
    return {
      park,
      date,
      crowdLevel: crowdLevel,
      explanation: explanations[crowdLevel],
    };
  },
});

// park: Magic Kingdom, Animal Kingdom, EPCOT, Hollywood Studios, Blizzard Beach, Typhoon Lagoon
// targetDate: YYYY-MM-DD
// returns 1-5, 1 being the lowest and 5 being the highest
async function getCrowdLevel(park: string, targetDate: Date) {
  const start = Math.floor(targetDate.setHours(0, 0, 0, 0) / 1000);
  const end = Math.floor(targetDate.setHours(23, 59, 59, 999) / 1000);

  const url = `https://magicguides.com/?rhc_action=get_calendar_events&post_type[]=events&calendar=disney-world-crowd-calendar&start=${start}&end=${end}&rhc_shrink=1&view=month&ver=827aaf17540df647cdc80f6a6e2b969a&_=${Math.random().toString(36).substring(2)}`;
  const response = await fetch(url);
  const data = await response.json() as any;
  
  // Find the event for the given date and park
  // The event title may look like: 'Animal Kingdom » [3]' or 'Magic Kingdom » [5]' etc.
  const event = Object.values(data.EVENTS).find((e: any) =>
    typeof e["3"] === 'string' && e["3"].toLowerCase().includes(park.toLowerCase())
  );
  if (event) {
    const match = (event as any)["3"].match(/\[(\d+)\]/);
    return Number(match[1]);
  }
  throw new Error(`Crowd level not found on ${targetDate} for ${park}`);
}
