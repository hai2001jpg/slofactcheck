import torch
from torch import nn
from transformers import MT5EncoderModel, BertModel, AutoModel

class MT5Classifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = MT5EncoderModel.from_pretrained("google/mt5-base")
        self.classifier = nn.Sequential(
            nn.Linear(self.encoder.config.hidden_size, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 1)
        )

    def forward(self, input_ids, attention_mask):
        output = self.encoder(input_ids=input_ids, attention_mask=attention_mask)
        pooled = output.last_hidden_state.mean(dim=1)
        return self.classifier(pooled)

class MBERTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.bert = BertModel.from_pretrained("bert-base-multilingual-cased")
        self.classifier = nn.Sequential(
            nn.Linear(self.bert.config.hidden_size, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 1)
        )

    def forward(self, input_ids, attention_mask):
        output = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        cls_output = output.last_hidden_state[:, 0, :]
        return self.classifier(cls_output)

class XLMRobertaClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.roberta = AutoModel.from_pretrained("xlm-roberta-base")
        self.classifier = nn.Sequential(
            nn.Linear(self.roberta.config.hidden_size, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 1)
        )

    def forward(self, input_ids, attention_mask):
        output = self.roberta(input_ids=input_ids, attention_mask=attention_mask)
        cls_output = output.last_hidden_state[:, 0, :]
        return self.classifier(cls_output)

class MDebertaClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.deberta = AutoModel.from_pretrained("microsoft/mdeberta-v3-base")
        self.classifier = nn.Sequential(
            nn.Linear(self.deberta.config.hidden_size, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 1)
        )

    def forward(self, input_ids, attention_mask):
        output = self.deberta(input_ids=input_ids, attention_mask=attention_mask)
        cls_output = output.last_hidden_state[:, 0, :]
        return self.classifier(cls_output)
