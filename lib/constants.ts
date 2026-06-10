export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

export const suggestions = [
  "Turn these meeting notes into clear next steps",
  "Help me plan this week's highest-impact work",
  "Research a topic and give me an executive brief",
  "Draft a polished update for my team",
];
