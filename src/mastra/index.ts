import { Mastra } from '@mastra/core';
import { disneyVacationAgent } from './agents';
import { storage } from './storage';

export const mastra = new Mastra({
  agents: { disneyVacationAgent },
  storage,
});
        