# Divide and Conquer

Divide and conquer is an algorithmic paradigm that solves a problem by breaking it into smaller subproblems, solving each subproblem recursively, and combining the partial solutions to obtain the final solution. It is one of the most widely used patterns in efficient algorithms and appears in many fundamental techniques such as sorting, searching, and matrix multiplication.

## General steps

1. Divide: split the problem into two or more smaller subproblems.
2. Conquer: solve each subproblem recursively (if the subproblem is small enough, solve it directly — the base case).
3. Combine: merge the solutions of the subproblems to form the solution of the original problem.

This pattern can be represented by the recurrence formula that describes the cost T(n) of the algorithm:

$$
T(n) = a\,T\left(\frac{n}{b}\right) + f(n)
$$

where:

- $a$ is the number of subproblems into which the original problem is divided,
- $n/b$ is the size of each subproblem (on average),
- $f(n)$ is the cost of dividing and combining.

The family of recurrences above can be analyzed with the Master Theorem to obtain the asymptotic complexity.

## Classic examples

- Merge Sort: divides the array in half ($a=2$, $b=2$), recursively sorts the halves, and combines with a linear merge; $T(n)=2T(n/2)+O(n) \Rightarrow O(n\log n)$.
- Quick Sort: divides by partitioning (linearly expected) and combines by concatenation; its performance depends on the chosen pivot (average $O(n\log n)$, worst $O(n^2)$).
- Binary Search: divides a problem of size $n$ into one subproblem of size $n/2$ ($a=1$, $b=2$) and requires no costly combination; $T(n)=T(n/2)+O(1) \Rightarrow O(\log n)$.
- Strassen (matrix multiplication): divides matrices into 4 blocks, performs 7 recursive multiplications instead of 8, and combines the blocks; it improves the exponent of classical multiplication.

## Master Theorem (summary)

For recurrences of the form $T(n)=aT(n/b)+f(n)$, compare $f(n)$ with $n^{\log_b a}$:

- If $f(n)=O(n^{\log_b a - \epsilon})$ for some $\epsilon>0$, then $T(n)=\Theta(n^{\log_b a})$.
- If $f(n)=\Theta(n^{\log_b a}\log^k n)$ for some $k\ge 0$, then $T(n)=\Theta(n^{\log_b a}\log^{k+1} n)$.
- If $f(n)=\Omega(n^{\log_b a + \epsilon})$ and also $a\,f(n/b)\le c\,f(n)$ for some constant $c<1$ and sufficiently large $n$ (regularity condition), then $T(n)=\Theta(f(n))$.

## Generic pseudocode

```
function divide_and_conquer(problem):
    if problem small enough:
        return solve_directly(problem)
    subproblems = divide(problem)
    results = []
    for sp in subproblems:
        results.append(divide_and_conquer(sp))
    return combine(results)
```

## Example: Merge Sort (Python)

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    # merge
    i = j = 0
    merged = []
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:]); merged.extend(right[j:])
    return merged
```

Complexity: $T(n)=2T(n/2)+O(n) \Rightarrow O(n\log n)$.

## Advantages and disadvantages

Advantages:

- Divide and conquer eases recursive reasoning and modular programming.
- Many algorithms based on this pattern are efficient and take advantage of natural parallelization (each subproblem can be solved in parallel).
- It yields asymptotically optimal algorithms for sorting, searching, and transformation problems.

Disadvantages:

- Recursive overhead and combination cost can affect the constant performance on small sizes.
- Not every problem splits into independent subproblems; in some cases the division creates complex dependencies.
- For some algorithms (e.g., Quicksort with a bad pivot), the balance between subproblems matters a lot and can degrade performance.

## Using parallelization

Divide and conquer is especially suitable for parallelism because subproblems are usually independent. Many frameworks and libraries (OpenMP, multiprocessing, fork-join in Java, etc.) exploit this pattern to speed up computations on machines with multiple cores.

## Practical tips

- Correctly identify the base case (problems small enough to solve directly).
- Make sure the division produces significantly smaller subproblems to avoid costly recurrences without benefit.
- Measure and compare against iterative solutions when recursive overhead and extra memory (e.g., temporary arrays) are problematic.

## Conclusion

Divide and conquer is an essential paradigm underlying many efficient algorithms. Understanding how to correctly divide a problem, how to combine subsolutions, and how to analyze the recurrence (for example with the Master Theorem) is key to designing effective and scalable solutions.
