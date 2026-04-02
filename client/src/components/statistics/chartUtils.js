// utility fn for building charts and formatting from analysis data

function parseCreatedAt(createdAt) {
  if (!createdAt) {
    return null;
  }

  if (createdAt instanceof Date) {
    return Number.isNaN(createdAt.getTime()) ? null : createdAt;
  }

  if (typeof createdAt === "object" && typeof createdAt.seconds === "number") {
    return new Date(createdAt.seconds * 1000);
  }

  const parsedDate = new Date(createdAt);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}


function formatDayLabel(date, locale) {
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatLocalDayKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function buildResultDistribution(
  analyses,
  resultLabels = { true: "True", false: "False", unknown: "Unknown" }
) {
  const counts = {
    true: 0,
    false: 0,
    unknown: 0,
  };

  analyses.forEach((analysis) => {
    const normalizedResult = String(analysis.result).toLowerCase();
    if (normalizedResult === "true") {
      counts.true += 1;
      return;
    }
    if (normalizedResult === "false") {
      counts.false += 1;
      return;
    }
    counts.unknown += 1;
  });

  return [
    { id: "true", label: resultLabels.true, value: counts.true, color: "#2b7fff" },
    { id: "false", label: resultLabels.false, value: counts.false, color: "#fb2c36" },
    { id: "unknown", label: resultLabels.unknown, value: counts.unknown, color: "#94a3b8" },
  ].filter((item) => item.value > 0);
}


export function buildCategoryChart(analyses, topicLabels = {}, fallbackTopic = "others") {
  const topicCounts = new Map();

  analyses.forEach((analysis) => {
    const topicKey = String(analysis.topic || fallbackTopic).toLowerCase();
    const topic = topicLabels[topicKey] || analysis.topic || fallbackTopic;
    topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
  });

  return Array.from(topicCounts.entries())
    .sort((firstTopic, secondTopic) => secondTopic[1] - firstTopic[1])
    .map(([topic, count]) => ({
      topic,
      count,
    }));
}


export function buildDailyTrend(analyses, locale = "en-US") {
  const dailyCounts = new Map();

  analyses.forEach((analysis) => {
    const date = parseCreatedAt(analysis.createdAt);
    if (!date) {
      return;
    }

    const dayKey = formatLocalDayKey(date);
    dailyCounts.set(dayKey, (dailyCounts.get(dayKey) || 0) + 1);
  });

  return Array.from(dailyCounts.entries())
    .sort((firstDay, secondDay) => firstDay[0].localeCompare(secondDay[0]))
    .map(([dayKey, count]) => {
      const date = new Date(`${dayKey}T00:00:00`);
      return {
        dayKey,
        label: Number.isNaN(date.getTime()) ? dayKey : formatDayLabel(date, locale),
        count,
      };
    });
}
