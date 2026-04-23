export const MODEL_DISPLAY_MAP = {
  mbert: "mBERT",
  xlm_roberta: "XLM-RoBERTa",
  mt5: "mT-5",
  mdeberta_v3: "mDeBERTa-v3",
};

export const MODEL_API_MAP = Object.fromEntries(
  Object.entries(MODEL_DISPLAY_MAP).map(([apiName, displayName]) => [displayName, apiName])
);

export const getModelDisplayName = (modelName) => MODEL_DISPLAY_MAP[modelName] || modelName;

export const getModelApiName = (modelName) => MODEL_API_MAP[modelName] || modelName;
