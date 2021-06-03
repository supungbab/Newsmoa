import torch
from pymongo import MongoClient
from kobart import get_kobart_tokenizer
from transformers.models.bart import BartForConditionalGeneration


def load_model():  # summary 모델 로드 함수
    summary = BartForConditionalGeneration.from_pretrained('./kobart_summary')
    # tokenizer = get_kobart_tokenizer()
    return summary


mongo = MongoClient("localhost", 27017)
db = mongo['newsmoa']
col = db['boards']
x = col.find({}, {"_id": 0, "index": 1, "content": 1})

model = load_model()
tokenizer = get_kobart_tokenizer()
for item in x:
    idx = item.get('index')
    text = item.get('content')
    if text:  # 2458자 이상의 문장은 오류
        text = text.replace('\n', '')
        input_ids = tokenizer.encode(text)
        input_ids = torch.tensor(input_ids)
        input_ids = input_ids.unsqueeze(0)
        output = model.generate(input_ids, eos_token_id=1, max_length=512, num_beams=5)
        output = tokenizer.decode(output[0], skip_special_tokens=True)
    col.update_one({"index": idx}, {"$set": {"summary": output}})
