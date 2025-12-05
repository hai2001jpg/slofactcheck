import torch
import time
import argparse
import os
from transformers import AutoTokenizer, T5Tokenizer
from model import MBERTClassifier, XLMRobertaClassifier, MT5Classifier, MDebertaClassifier


start = time.perf_counter()
# Načítanie modelu podľa názvu
def load_model(model_name="mbert"):

    base_dir = f"models/{model_name}"
    tokenizer_dir = f"{base_dir}/tokenizer"
    model_path = f"{base_dir}/{model_name}_finetuned.pt"

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Error loading model: {model_path}")

    if not os.path.exists(tokenizer_dir):
        raise FileNotFoundError(f"Error loading tokenizer: {tokenizer_dir}")

    print(f"Loading {model_name}...")

    # ---- mBERT ----
    if model_name == "mbert":
        tokenizer = AutoTokenizer.from_pretrained(tokenizer_dir, use_fast=False)
        model = MBERTClassifier()
        model.load_state_dict(torch.load(model_path, map_location="cpu"))
        model.eval()
        return tokenizer, model, "mbert"

    # ---- XLM-R ----
    if model_name == "xlm_roberta":
        tokenizer = AutoTokenizer.from_pretrained(tokenizer_dir, use_fast=False)
        model = XLMRobertaClassifier()
        model.load_state_dict(torch.load(model_path, map_location="cpu"))
        model.eval()
        return tokenizer, model, "xlm_roberta"

    # ---- MT5 ----
    if model_name == "mt5":
        tokenizer = T5Tokenizer.from_pretrained(tokenizer_dir)
        model = MT5Classifier()
        model.load_state_dict(torch.load(model_path, map_location="cpu"))
        model.eval()
        return tokenizer, model, "mt5"

    # ---- mDeBERTa v3 ----
    if model_name == "mdeberta_v3":
        tokenizer = AutoTokenizer.from_pretrained(tokenizer_dir, use_fast=False)
        model = MDebertaClassifier()
        model.load_state_dict(torch.load(model_path, map_location="cpu"))
        model.eval()
        return tokenizer, model, "mdeberta_v3"

    raise ValueError("Error while selecting model.")


# Spracovanie textu
def predict_text(text, tokenizer, model, model_type):

    if model_type == "mt5":
        encoded = tokenizer(
            f"classify: {text}",
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=512
        )

        with torch.no_grad():
            output = model(encoded["input_ids"])
            prediction = output.logits.squeeze().item()

        label = "true" if prediction < 0.5 else "false"
        p_true = 1 - prediction
        p_fake = prediction
        prob = p_fake if label == "false" else p_true
        prob = round(prob, 4)
        return label, prob

    # ostatné modely → binárna klasifikácia
    tokens = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )

    with torch.no_grad():
        logits = model(tokens["input_ids"], tokens["attention_mask"])
        prob_raw = torch.sigmoid(logits).item()

    label = "false" if prob_raw > 0.5 else "true"
    p_true = 1 - prob_raw
    p_fake = prob_raw
    prob = p_fake if label == "false" else p_true
    prob = round(prob, 4)
    return label, prob


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--model",
        type=str,
        choices=["mbert", "xlm_roberta", "mt5", "mdeberta_v3"],
        default="mbert",
        help="Choose model for prediction"
    )
    args = parser.parse_args()

    text = input("Enter text for analysis:\n")

    tokenizer, model, model_type = load_model(args.model)

    label, p_true, p_fake = predict_text(text, tokenizer, model, model_type)

    print("\nResult:", label)
    print(f" TRUE: {p_true*100:.2f}% | FAKE: {p_fake*100:.2f}%")
    print(f"Runtime: {time.perf_counter() - start:.2f}s")