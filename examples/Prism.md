# Prism test

Este README sirve para probar que Prism resalta cada lenguaje instalado.

## HTML

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Hola</title>
  </head>
  <body>
    <button class="btn">Enviar</button>
  </body>
</html>
```

## CSS

```css
body {
  margin: 0;
  background: #111827;
  color: #f9fafb;
}

.button {
  padding: 0.75rem 1rem;
  border-radius: 8px;
}
```

## JavaScript

```javascript
const sumar = (a, b) => a + b;

console.log(sumar(2, 3));

for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

## TypeScript

```typescript
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: 'Ana'
};

console.log(user.name.toUpperCase());
```

## Python

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fibonacci(10))
```

## Bash

```bash
#!/bin/bash
name="Ana"
echo "Hola $name"
ls -la
```

## JSON

```json
{
  "name": "blog",
  "version": "1.0.0",
  "scripts": {
    "dev": "python manage.py runserver"
  }
}
```

## SQL

```sql
SELECT id, title, created_at
FROM posts
WHERE published = 1
ORDER BY created_at DESC
LIMIT 10;
```

## Java

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

## C

```c
#include <stdio.h>

int main(void) {
    printf("Hola desde C\\n");
    return 0;
}
```

## C++

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hola desde C++" << endl;
    return 0;
}
```

## C#

```csharp
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hola desde C#");
    }
}
```

## PHP

```php
<?php
$mensaje = "Hola desde PHP";
echo $mensaje;
```

## Ruby

```ruby
def saludo(nombre)
  "Hola, #{nombre}!"
end

puts saludo("Ruby")
```

## Go

```go
package main

import "fmt"

func main() {
    fmt.Println("Hola desde Go")
}
```

## Rust

```rust
fn main() {
    println!("Hola desde Rust");
}
```

## Swift

```swift
let mensaje = "Hola desde Swift"
print(mensaje)
```

## YAML

```yaml
name: blog
version: 1.0.0
scripts:
  dev: python manage.py runserver
```

## Markdown

````markdown
# Titulo

- item 1
- item 2

```javascript
console.log('hola');
```
````

## Kotlin

```kotlin
fun fibonacci(n: Int): Int {
    var a = 0
    var b = 1
    repeat(n) {
        val temp = a
        a = b
        b = temp + b
    }
    return a
}

fun main() {
    println(fibonacci(10))
}
```

## Perl

```perl
#!/usr/bin/perl
use strict;
use warnings;

my @nombres = ("Ana", "Luis", "Maria");

foreach my $nombre (@nombres) {
    print "Hola, $nombre\n";
}

sub cuadrado {
    my ($x) = @_;
    return $x * $x;
}

print "5^2 = " . cuadrado(5) . "\n";
```

## Scala

```scala
object Main extends App {
  def fibonacci(n: Int): Int = n match {
    case 0 => 0
    case 1 => 1
    case _ => fibonacci(n - 1) + fibonacci(n - 2)
  }

  val numeros = List(1, 2, 3, 4, 5)
  val cuadrados = numeros.map(x => x * x)

  println(s"Fibonacci(10) = ${fibonacci(10)}")
  println(s"Cuadrados: $cuadrados")
}
```

## CoffeeScript

```coffeescript
sumar = (a, b) -> a + b

restar = (a, b) ->
  a - b

console.log sumar(3, 4)
console.log restar(10, 2)

nombres = ["Ana", "Luis", "Maria"]
for nombre in nombres
  console.log "Hola, #{nombre}"
```

## Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
```

## Prolog

```prolog
% Definir hechos
padre(juan, maria).
padre(juan, pedro).
madre(ana, maria).
madre(ana, pedro).

% Reglas
hijo(X, Y) :- padre(Y, X).
hijo(X, Y) :- madre(Y, X).
hermano(X, Y) :- padre(Z, X), padre(Z, Y), X \\= Y.

% Consultas
:- initialization(main).

main :-
    findall(X, hijo(X, juan), Hijos),
    write('Hijos de Juan: '), write(Hijos), nl,
    halt.
```

## Regex

```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b

https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)

\b(?:[A-Z][a-z]+\s*){2,}\b
```
