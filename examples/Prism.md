# Prism test

This README is used to test that Prism highlights each installed language.

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Hello</title>
  </head>
  <body>
    <button class="btn">Send</button>
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
const add = (a, b) => a + b;

console.log(add(2, 3));

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
echo "Hello $name"
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
    printf("Hello from C\\n");
    return 0;
}
```

## C++

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++" << endl;
    return 0;
}
```

## C#

```csharp
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello from C#");
    }
}
```

## PHP

```php
<?php
$message = "Hello from PHP";
echo $message;
```

## Ruby

```ruby
def greet(name)
  "Hello, #{name}!"
end

puts greet("Ruby")
```

## Go

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go")
}
```

## Rust

```rust
fn main() {
    println!("Hello from Rust");
}
```

## Swift

```swift
let message = "Hello from Swift"
print(message)
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
# Title

- item 1
- item 2

```javascript
console.log('hello');
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

my @names = ("Ana", "Luis", "Maria");

foreach my $name (@names) {
    print "Hello, $name\n";
}

sub square {
    my ($x) = @_;
    return $x * $x;
}

print "5^2 = " . square(5) . "\n";
```

## Scala

```scala
object Main extends App {
  def fibonacci(n: Int): Int = n match {
    case 0 => 0
    case 1 => 1
    case _ => fibonacci(n - 1) + fibonacci(n - 2)
  }

  val numbers = List(1, 2, 3, 4, 5)
  val squares = numbers.map(x => x * x)

  println(s"Fibonacci(10) = ${fibonacci(10)}")
  println(s"Squares: $squares")
}
```

## CoffeeScript

```coffeescript
add = (a, b) -> a + b

subtract = (a, b) ->
  a - b

console.log add(3, 4)
console.log subtract(10, 2)

names = ["Ana", "Luis", "Maria"]
for name in names
  console.log "Hello, #{name}"
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
% Define facts
father(juan, maria).
father(juan, pedro).
mother(ana, maria).
mother(ana, pedro).

% Rules
child(X, Y) :- father(Y, X).
child(X, Y) :- mother(Y, X).
sibling(X, Y) :- parent(Z, X), parent(Z, Y), X \\= Y.

% Queries
:- initialization(main).

main :-
    findall(X, child(X, juan), Children),
    write('Children of Juan: '), write(Children), nl,
    halt.
```

## Regex

```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b

https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)

\b(?:[A-Z][a-z]+\s*){2,}\b
```
