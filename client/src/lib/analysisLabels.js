export const getResultLabel = (result, t) => {
  const resultKey = String(result).toLowerCase();

  if (resultKey === "true" || resultKey === "false") {
    return t(`analysis:resultValues.${resultKey}`);
  }

  return t("analysis:resultValues.unknown");
};

export const getTopicLabel = (topic, t, fallbackLabel) => {
  if (!topic) {
    return fallbackLabel;
  }

  const topicKey = String(topic).toLowerCase();
  const translatedTopic = t(`analysis:topicValues.${topicKey}`, {
    defaultValue: "",
  });

  return translatedTopic || topic;
};
