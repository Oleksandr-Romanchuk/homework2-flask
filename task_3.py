a = float(input("Введіть a: "))
b = float(input("Введіть b: "))
c = float(input("Введіть c: "))

d = b ** 2 - 4 * a * c

x1 = (-b + d ** 0.5) / (2 * a)
x2 = (-b - d ** 0.5) / (2 * a)

print("x1 =", x1)
print("x2 =", x2)