type Contribution = { date: string; count: number; level: number };

export default async function ContributionCalendar() {
  let contributions: Contribution[] = [];
  try {
    const response = await fetch("https://github-contributions-api.jogruber.de/v4/tanav29?y=last", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.contributions)) contributions = data.contributions;
    }
  } catch {
    // The rest of the portfolio remains usable if the contribution service is down.
  }

  if (!contributions.length) {
    return <p className="mt-4 text-sm text-muted-foreground">contribution activity is temporarily unavailable. <a className="underline underline-offset-4" href="https://github.com/tanav29">view it on github</a>.</p>;
  }

  const total = contributions.reduce((sum, day) => sum + day.count, 0);
  const firstDay = new Date(`${contributions[0].date}T00:00:00Z`).getUTCDay();

  return (
    <div className="mt-4 rounded-md bg-neutral-50 p-3">
      <p className="mb-3 text-xs text-muted-foreground"><span className="font-semibold text-foreground">{total.toLocaleString()}</span> contributions in the last year</p>
      <div className="overflow-x-auto pb-1" tabIndex={0} aria-label="GitHub contribution graph; scroll horizontally to see the full year">
        <div className="contribution-grid" role="img" aria-label={`${total.toLocaleString()} GitHub contributions in the last year`}>
          {Array.from({ length: firstDay }, (_, index) => <span key={`empty-${index}`} />)}
          {contributions.map((day) => (
            <span key={day.date} className={`contribution-day contribution-level-${Math.min(4, Math.max(0, day.level))}`} title={`${day.count} contributions on ${day.date}`} />
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>last 12 months</span>
        <span className="flex items-center gap-1" aria-label="Contribution levels, from less to more">less <i className="contribution-key contribution-level-0" /><i className="contribution-key contribution-level-1" /><i className="contribution-key contribution-level-2" /><i className="contribution-key contribution-level-3" /><i className="contribution-key contribution-level-4" /> more</span>
      </div>
    </div>
  );
}

