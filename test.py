from transformers import T5ForConditionalGeneration, T5Tokenizer

# Load from directory
model = T5ForConditionalGeneration.from_pretrained(
    "sql_generator",
    local_files_only=True
)

tokenizer = T5Tokenizer.from_pretrained(
    "sql_generator",
    local_files_only=True
)

# Verify loading
def generate_sql(question):
    inputs = tokenizer(f"Translate to SQL: {question}", return_tensors="pt")
    outputs = model.generate(**inputs)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

print(generate_sql("get me teams who play in premier league and have won more than 4 championships"))