import json
import re

log_path = r"C:\Users\mudas\.gemini\antigravity-ide\brain\064ed045-8ff3-476a-849b-9e1b948c29dd\.system_generated\logs\transcript_full.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

last_user_input = ""
for line in reversed(lines):
    data = json.loads(line)
    if data.get("type") == "USER_INPUT":
        content = data.get("content", "")
        if "w9tuzg187" in content:
            last_user_input = content
            break

print("Length of HTML string:", len(last_user_input))

# Extract all images
img_srcs = re.findall(r'src=["\'](https?://[^"\']+)["\']', last_user_input)
print("Unique image URLs:", len(set(img_srcs)))
for img in set(img_srcs):
    print("  IMG:", img)

# Extract all links
links = re.findall(r'href=["\'](https?://[^"\']+)["\']', last_user_input)
print("Unique links:", len(set(links)))
for l in set(links):
    print("  LINK:", l)

# Search for any project titles, card titles, or text elements
# Let's clean the HTML tags and print text paragraphs
clean_text = re.sub(r'<[^>]+>', '\n', last_user_input)
lines = [line.strip() for line in clean_text.split('\n') if line.strip()]

print("\n--- ALL EXTRACTED TEXT LINES ---")
unique_lines = []
for l in lines:
    if len(l) > 2 and l not in unique_lines and not l.startswith('{') and not l.startswith('var'):
        unique_lines.append(l)

print(f"Total unique text lines: {len(unique_lines)}")
for idx, line in enumerate(unique_lines):
    print(f"{idx+1}: {line}")
