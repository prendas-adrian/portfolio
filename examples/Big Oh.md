# O(n): Linear Complexity

Big O notation describes the growth of an algorithm's execution time as a function of the size of the input.

## What does O(n) mean?

O(n) means that the execution time grows linearly with respect to the number of elements being processed.

If the input has size n, the algorithm takes roughly n steps to run, in the worst case.

## Simple example

```javascript
function walkList(list) {
  for (const element of list) {
    console.log(element);
  }
}
```

This algorithm visits every element of the list once. If the list has 10 elements, it makes 10 prints; if it has 100 elements, it makes 100 prints.

That is why its complexity is said to be O(n).

## Visualization

```text
Input:  1, 2, 3, 4, 5, ..., n
Time:   1, 2, 3, 4, 5, ..., n
```

The relationship between input and time is proportional.

## Example with search

```javascript
function findElement(list, value) {
  for (const element of list) {
    if (element === value) {
      return true;
    }
  }
  return false;
}
```

In the worst case, you may have to check all the elements of the list. That is why this linear search has O(n) complexity.

## When is it O(n)?

An algorithm is O(n) when:

- it goes through all the elements of a structure
- it makes a single pass over the input
- the number of operations grows proportionally to the size of the input

## Comparison with other complexities

- O(1): constant time
- O(log n): slower growth
- O(n): linear growth
- O(n^2): quadratic growth

## Importance

Understanding O(n) helps choose more efficient algorithms, especially when working with large amounts of data.

## In summary

O(n) means that the execution time increases proportionally to the size of the input. It is one of the most common complexities and appears when elements are visited or checked one by one.
