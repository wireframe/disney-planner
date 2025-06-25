# Disney Planner

## Overview

Disney Planner is an AI-powered assistant designed to help users plan unforgettable Disney vacations. Leveraging the Mastra agent framework and OpenAI models, the Disney Vacation Planner agent provides personalized recommendations for Disney parks, custom itineraries, dining suggestions, and up-to-date information on park policies. It also features a custom tool for predicting crowd levels at Disney parks on specific dates.

**Key Features:**
- Personalized Disney vacation planning via an AI agent
- Park and itinerary recommendations tailored to user needs
- Dining and attraction suggestions
- Real-time crowd level predictions for Disney parks
- Up-to-date advice on Genie+, Lightning Lane, and park reservation systems

## Project Structure
- `src/mastra/agents/` — Contains the main Disney Vacation Planner agent
- `src/mastra/tools/` — Custom tools, including the crowd calendar tool
- `src/mastra/storage.ts` — Local database configuration for agent memory
- `.mastra/output/playground/` — Web playground UI for interacting with the agent

## Setup

### Prerequisites
- Node.js v20.9.0 or higher
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd disney-planner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## How to Run

### Development Mode
To start the agent and the playground UI in development mode:
```sh
npm run dev
```
This will launch the Mastra development server. By default, you can access the playground UI at `http://localhost:3000` (or the port specified by Mastra in your terminal output).

### Build for Production
To build the project for production:
```sh
npm run build
```

## Usage
- Open your browser and navigate to the playground UI (see terminal output for the exact URL).
- Interact with the Disney Vacation Planner agent to receive personalized vacation planning advice.

## Notes
- The agent uses a local SQLite database (`memory.db`) for memory and context.
- Crowd level predictions are powered by the custom `crowdCalendarTool` and may require internet access to fetch up-to-date data.

---

## Future Feature Ideas

- **Itinerary Planning Workflow:**
  - Automatically generate daily park assignments based on crowd levels, user preferences, and party size.
  - Suggest optimal Genie+ and Lightning Lane strategies.
  - Recommend dining reservations and special experiences.
  - Output a shareable, day-by-day itinerary.

- **Weather Integration:**
  - Provide real-time weather forecasts for each park and date.
  - Suggest packing tips and alternate plans for inclement weather.

- **Reservation & Ticket Reminders:**
  - Notify users of important booking windows (dining, park reservations, special events).

- **Budget Planning Tool:**
  - Estimate trip costs based on user selections and provide money-saving tips.

- **Live Wait Times & Alerts:**
  - Integrate with APIs for live wait times and send alerts for low-crowd opportunities.

- **Multi-park/Resort Support:**
  - Expand recommendations to Disneyland, Paris, Tokyo, and other Disney resorts.

Feel free to contribute or suggest more features! 