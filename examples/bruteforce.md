# Brute force

Brute force (fuerza bruta) es una técnica de ataque o de búsqueda que consiste en probar todas las combinaciones posibles de elementos hasta encontrar la solución buscada. En seguridad informática se aplica, por ejemplo, para adivinar contraseñas, claves criptográficas o llaves de cifrado mediante intentos repetidos y sistemáticos.

## ¿Cómo funciona?

El principio es simple: dada una longitud máxima y un conjunto de caracteres (alfabeto), se generan y se prueban todas las cadenas posibles hasta que una coincide con el objetivo. Si el alfabeto tiene tamaño $A$ y la longitud de la clave es $L$, el número de combinaciones posibles es aproximadamente $A^L$. Esto crece exponencialmente con la longitud, por lo que el coste computacional se dispara cuando aumentan $A$ o $L$.

Ejemplo: para contraseñas formadas solo por letras minúsculas ($A=26$) y longitud $L=8$, hay $26^8\approx 2{,}09\times10^{11}$ combinaciones.

## Tipos de ataques relacionados

- Fuerza bruta pura: prueba exhaustiva de todas las combinaciones posibles.
- Ataque por diccionario: prueba palabras y frases comunes (más eficiente si la contraseña es humana).
- Ataque híbrido: combinación de diccionario con variaciones (sustituciones, sufijos, prefijos).
- Ataque por búsqueda de claves criptográficas: intenta todas las claves hasta descifrar un mensaje.

## Ventajas y limitaciones

- Ventaja: si hay tiempo y recursos suficientes, garantiza encontrar la clave (si existe dentro del espacio buscado).
- Limitación: coste exponencial. Para espacios grandes puede ser totalmente impracticable.
- Limitación práctica: ataques online (contra un servicio) suelen verse frenados por límites de velocidad, bloqueos y captchas.

## Mitigaciones y buenas prácticas

Para reducir la eficacia de los ataques de fuerza bruta se recomiendan varias defensas combinadas:

- Contraseñas largas y aleatorias: aumentar $L$ y usar un alfabeto grande incrementa $A^L$ y hace inviable el ataque.
- Hashing y salting: almacenar solo hashes con sal (y con funciones resistentes a GPU como bcrypt, scrypt o Argon2).
- Rate limiting y bloqueos temporales: limitar intentos fallidos por cuenta o IP.
- Autenticación multifactor (MFA): añade una barrera adicional que la contraseña sola no puede superar.
- Key stretching: aplicar iteraciones costosas para ralentizar la verificación de contraseñas.

## Ejemplo de estimación de tiempo

Si un atacante puede probar $10^9$ (mil millones) de contraseñas por segundo en un ataque offline (suponiendo hardware especializado), una clave con $2\times10^{11}$ posibilidades tardaría aproximadamente $200$ segundos en recorrerse completamente en promedio. Sin embargo, ataques online típicos están limitados a muy pocos intentos por segundo, lo que vuelve la fuerza bruta impracticable en ese escenario.

## Herramientas y ética

Existen herramientas que automatizan ataques por fuerza bruta (por ejemplo, herramientas de auditoría de contraseñas o de recuperación de claves). Su uso sin autorización es ilegal y poco ético. En contextos de auditoría o pruebas de penetración autorizadas, las pruebas deben realizarse con permiso explícito, documentación y medidas para evitar afectar a terceros.

## Conclusión

La fuerza bruta es el método más directo y, en principio, infalible para encontrar una solución dentro de un espacio finito: prueba todas las posibilidades. Sin embargo, su utilidad real depende de la magnitud del espacio de búsqueda y de las restricciones prácticas (velocidad, coste y defensas del sistema). Buenas prácticas de seguridad (contraseñas largas y aleatorias, hashing con sal, MFA y límites de acceso) hacen que los ataques por fuerza bruta sean, en la práctica, poco eficaces.

---

Si quieres, puedo: añadir ejemplos de comandos de herramientas legales (solo para auditoría), traducir el archivo al inglés o integrarlo en el README.

## Ejemplo en Python

El siguiente ejemplo ilustra de forma didáctica cómo implementar un intento de fuerza bruta que prueba todas las combinaciones de un conjunto de caracteres hasta encontrar una cadena objetivo. Es solo con fines educativos y no debe usarse contra sistemas sin autorización.

```python
import itertools

charset = list('abcdefghijklmnopqrstuvwxyz0123456789')
target = 'a1b'   # cadena que queremos encontrar
max_len = 3
found = False

for length in range(1, max_len + 1):
		for comb in itertools.product(charset, repeat=length):
				attempt = ''.join(comb)
				if attempt == target:
						print(f"Encontrado: {attempt}")
						found = True
						break
		if found:
				break

if not found:
		print('No encontrado')
```

Notas:

- `itertools.product` genera el producto cartesiano (todas las combinaciones con repetición) de `charset` con la longitud indicada.
- Este script es didáctico y extremadamente ineficiente para espacios grandes; en la práctica se usan optimizaciones, diccionarios o técnicas específicas.
- No uses este código contra servicios reales sin permiso explícito; su uso no autorizado es ilegal y poco ético.
