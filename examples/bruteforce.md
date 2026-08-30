# Brute force

Brute force is an attack or search technique that consists of testing every possible combination of elements until finding the sought solution. In computer security it is applied, for example, to guess passwords, cryptographic keys, or encryption keys through repeated and systematic attempts.

## How it works

The principle is simple: given a maximum length and a set of characters (alphabet), every possible string is generated and tested until one matches the target. If the alphabet has size $A$ and the key length is $L$, the number of possible combinations is approximately $A^L$. This grows exponentially with length, so the computational cost skyrockets when $A$ or $L$ increase.

Example: for passwords made only of lowercase letters ($A=26$) and length $L=8$, there are $26^8\approx 2{,}09\times10^{11}$ combinations.

## Related attack types

- Pure brute force: exhaustive testing of every possible combination.
- Dictionary attack: tries common words and phrases (more efficient if the password is human-chosen).
- Hybrid attack: combination of a dictionary with variations (substitutions, suffixes, prefixes).
- Cryptographic key search attack: tries every key until a message is decrypted.

## Advantages and limitations

- Advantage: given enough time and resources, it guarantees finding the key (if it exists within the searched space).
- Limitation: exponential cost. For large spaces it can be completely impractical.
- Practical limitation: online attacks (against a service) are usually hindered by rate limits, blockouts, and captchas.

## Mitigations and best practices

To reduce the effectiveness of brute force attacks, several combined defenses are recommended:

- Long, random passwords: increasing $L$ and using a large alphabet raises $A^L$ and makes the attack unfeasible.
- Hashing and salting: store only salted hashes (with GPU-resistant functions such as bcrypt, scrypt, or Argon2).
- Rate limiting and temporary blockouts: limit failed attempts per account or IP.
- Multi-factor authentication (MFA): adds an extra barrier that a password alone cannot overcome.
- Key stretching: apply expensive iterations to slow down password verification.

## Time estimation example

If an attacker can test $10^9$ (one billion) passwords per second in an offline attack (assuming specialized hardware), a key with $2\times10^{11}$ possibilities would take roughly $200$ seconds to be fully covered on average. However, typical online attacks are limited to very few attempts per second, which makes brute force impractical in that scenario.

## Tools and ethics

There are tools that automate brute force attacks (for example, password auditing or key recovery tools). Using them without authorization is illegal and unethical. In authorized auditing or penetration testing contexts, tests must be carried out with explicit permission, documentation, and measures to avoid affecting third parties.

## Conclusion

Brute force is the most direct method and, in principle, infallible for finding a solution within a finite space: it tests every possibility. However, its real usefulness depends on the magnitude of the search space and on practical constraints (speed, cost, and the system's defenses). Good security practices (long random passwords, salted hashing, MFA, and access limits) make brute force attacks, in practice, largely ineffective.

---

## Example in Python

The following example didactically illustrates how to implement a brute force attempt that tests all combinations of a character set until finding a target string. It is for educational purposes only and must not be used against systems without authorization.

```python
import itertools

charset = list('abcdefghijklmnopqrstuvwxyz0123456789')
target = 'a1b'   # the string we want to find
max_len = 3
found = False

for length in range(1, max_len + 1):
		for comb in itertools.product(charset, repeat=length):
				attempt = ''.join(comb)
				if attempt == target:
						print(f"Found: {attempt}")
						found = True
						break
		if found:
				break

if not found:
		print('Not found')
```

Notes:

- `itertools.product` generates the cartesian product (all combinations with repetition) of `charset` with the given length.
- This script is didactic and extremely inefficient for large spaces; in practice, optimizations, dictionaries, or specific techniques are used.
- Do not use this code against real services without explicit permission; unauthorized use is illegal and unethical.
