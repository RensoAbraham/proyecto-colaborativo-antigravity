# RPSoft – Skill React  
## Reglas y Buenas Prácticas

Esta skill define estándares obligatorios para desarrollo en React.

---

# 1. Componentes

- Solo componentes funcionales
- Un componente = una responsabilidad
- Componentes pequeños y reutilizables
- Props tipadas (TypeScript recomendado)

```jsx
export function UserCard({ user }) {
  return <div>{user.name}</div>
}
```

---

# 2. Hooks

- No usar hooks en condicionales
- No usar hooks en loops
- Siempre declararlos al inicio

Correcto:

```js
useEffect(() => {
  fetchData()
}, [])
```

---

# 3. Estado

- No abusar de useState
- Preferir estado derivado
- Extraer lógica compleja a hooks personalizados

```js
function useUser() {
  const [user, setUser] = useState(null)
  return { user, setUser }
}
```

---

# 4. Renderizado

- Evitar renders innecesarios
- Usar memoización con criterio
- No usar index como key si la lista puede cambiar

Correcto:

```jsx
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}
```

---

# 5. Estructura Recomendada

```
components/
hooks/
contexts/
services/
utils/
```

---

# 6. Buenas Prácticas

- Separar lógica de presentación
- No mezclar demasiada lógica en JSX
- Validar props
- Código declarativo
- Eliminar código muerto
