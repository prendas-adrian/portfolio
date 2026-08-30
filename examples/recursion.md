# What is recursion?

Recursion is a programming technique in which a function calls itself to solve a problem.

## Main idea

When a problem can be divided into smaller versions of the same problem, recursion can be a clear and elegant solution.

## Basic example

```ruby
def countdown(n)
  if n == 0
    puts "End"
    return
  end

  puts n
  countdown(n - 1)
end

countdown(5)
```

### Output

```ruby
5
4
3
2
1
End
```

## Base case

The base case is the condition that makes the function terminate. Without it, the function would call itself forever and could produce an error.

```ruby
def recursive
  recursive
end
```

## Factorial example

```ruby
def factorial(n)
  if n == 0
    return 1
  end

  n * factorial(n - 1)
end

puts factorial(5)
```

### Result

```ruby
120
```

## When to use it?

Recursion is useful for:

- trees
- linked lists
- mathematical algorithms
- problems that can be divided into smaller subproblems

## Advantages

- Simplifies complex solutions.
- It is useful in hierarchical problems.
- Makes the code more readable in certain cases.

## Disadvantages

- It can consume more memory.
- If the base case is not well defined, it can cause an infinite loop.
- It is sometimes less efficient than an iterative solution.

## In summary

Recursion is when a function solves itself by calling itself with a smaller problem until reaching a stopping condition. It is a very useful tool, but it must be used with care.
