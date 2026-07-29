import type { Activity } from "react-activity-calendar";
import GithubCalendarClient from "./github-calendar-client";

const CALENDAR_API = "https://github-contributions-api.jogruber.de/v4";

async function getContributions(username: string): Promise<Activity[]> {
  const response = await fetch(`${CALENDAR_API}/${username}?y=last`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub contributions for ${username}`);
  }

  const data: { contributions: Activity[] } = await response.json();
  return data.contributions;
}

export default async function GithubCalendar({
  username = "tanav29",
  blockSize = 1,
}: {
  username?: string;
  blockSize?: number;
}) {
  let contributions: Activity[] = [];

  try {
    contributions = await getContributions(username);
  } catch {
    // Keep the page available if the upstream contributions API is unavailable.
  }

  return (
    <GithubCalendarClient
      username={username}
      blockSize={blockSize}
      contributions={contributions}
    />
  );
}
