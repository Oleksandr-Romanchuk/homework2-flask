text = input("Введіть фразу з 10 символів: ")

result = (
    ord(text[0]) +
    ord(text[1]) +
    ord(text[2]) +
    ord(text[3]) +
    ord(text[4]) +
    ord(text[5]) +
    ord(text[6]) +
    ord(text[7]) +
    ord(text[8]) +
    ord(text[9])
)

print("Сума ASCII-кодів:", result)