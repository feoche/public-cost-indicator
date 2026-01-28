# Format des Configurations pour le Chatbot

## Vue d'ensemble

Lorsque l'assistant IA propose plusieurs configurations d'infrastructure, il doit formater ses réponses de manière spécifique pour que l'interface utilisateur puisse détecter et afficher des boutons permettant d'appliquer ces configurations.

## Format JSON Attendu

Les configurations doivent être incluses dans des blocs de code JSON markdown. Chaque configuration doit contenir au minimum un champ `name` et peut inclure n'importe quel champ de configuration valide.

### Structure

```json
{
  "name": "Nom de la configuration",
  "gamme": "Valeur optionnelle",
  "limit": "Valeur optionnelle",
  "modeleHardware": "Valeur optionnelle",
  "cpu": 4,
  "memoire": 16,
  "blockStorage": 100,
  "ipPubliques": 2,
  "stockageS3": 0,
  "localisation": "Valeur optionnelle",
  "region": "Valeur optionnelle",
  "resilience": "Valeur optionnelle",
  "modeRotation": "Valeur optionnelle",
  "souverainete": "Valeur optionnelle",
  "savingsPlan": "Valeur optionnelle"
}
```

### Champs Disponibles

| Champ | Type | Description |
|-------|------|-------------|
| `name` | string | **Obligatoire** - Nom de la configuration affiché sur le bouton |
| `gamme` | string | Gamme du produit |
| `limit` | string | Limite du produit |
| `modeleHardware` | string | Modèle de hardware (ex: "Intel Xeon Gold") |
| `cpu` | number | Nombre de cœurs CPU |
| `memoire` | number | Mémoire RAM en GB |
| `blockStorage` | number | Stockage en blocs en GB |
| `ipPubliques` | number | Nombre d'adresses IP publiques |
| `stockageS3` | number | Stockage S3 en GB |
| `localisation` | string | Localisation (ex: "paris", "frankfurt") |
| `region` | string | Région (ex: "eu-west", "eu-central") |
| `resilience` | string | Niveau de résilience (ex: "1az", "2az", "3az") |
| `modeRotation` | string | Mode de rotation des sauvegardes |
| `souverainete` | string | Souveraineté des données |
| `savingsPlan` | string | Plan d'économies |

## Exemple de Réponse du Chatbot

Voici un exemple de réponse formatée correctement :

```markdown
Voici trois configurations que je vous recommande pour votre application web :

### Configuration 1 : Environnement de développement

```json
{
  "name": "Configuration Dev",
  "cpu": 2,
  "memoire": 8,
  "blockStorage": 50,
  "ipPubliques": 1,
  "stockageS3": 100,
  "localisation": "paris",
  "region": "eu-west",
  "resilience": "1az"
}
```

Cette configuration est idéale pour le développement avec des coûts réduits.

### Configuration 2 : Production Standard

```json
{
  "name": "Configuration Production",
  "cpu": 8,
  "memoire": 32,
  "blockStorage": 500,
  "ipPubliques": 2,
  "stockageS3": 1000,
  "localisation": "paris",
  "region": "eu-west",
  "resilience": "2az"
}
```

Configuration recommandée pour la production avec haute disponibilité.

### Configuration 3 : Haute Performance

```json
{
  "name": "Configuration Haute Performance",
  "cpu": 16,
  "memoire": 64,
  "blockStorage": 1000,
  "ipPubliques": 4,
  "stockageS3": 5000,
  "localisation": "paris",
  "region": "eu-west",
  "resilience": "3az"
}
```

Pour les charges de travail intensives nécessitant performance maximale.
```

## Comportement de l'Interface

Lorsque l'IA envoie une réponse avec des configurations formatées :

1. L'interface détecte automatiquement les blocs JSON
2. Un message s'affiche : "Quelle configuration souhaitez-vous appliquer ?"
3. Des boutons sont créés pour chaque configuration détectée
4. Cliquer sur un bouton applique automatiquement la configuration au formulaire "Configuration 1"
5. Une notification confirme l'application de la configuration

## Notes Importantes

- **Le champ `name` est obligatoire** - Sans lui, la configuration sera ignorée
- Seuls les champs fournis seront mis à jour - Les autres conserveront leurs valeurs actuelles
- Les configurations doivent être dans des blocs de code markdown avec la balise `json`
- Plusieurs configurations peuvent être proposées dans une même réponse
- Les valeurs doivent correspondre aux types attendus (nombres pour cpu, memoire, etc.)

## Exemple d'Intégration dans le Prompt Système

Pour que l'IA utilise correctement ce format, ajoutez ces instructions au prompt système :

```
Lorsque vous proposez des configurations d'infrastructure, formatez-les toujours en JSON dans des blocs de code markdown.
Chaque configuration doit avoir un champ "name" descriptif et inclure les paramètres pertinents.

Exemple :
```json
{
  "name": "Configuration Recommandée",
  "cpu": 4,
  "memoire": 16,
  "blockStorage": 200
}
```
```

## Dépannage

### Les boutons ne s'affichent pas ?

- Vérifiez que le JSON est dans un bloc de code markdown avec \`\`\`json
- Assurez-vous que le champ `name` est présent
- Vérifiez la syntaxe JSON (virgules, guillemets, etc.)
- Les blocs doivent être fermés correctement avec \`\`\`

### La configuration ne s'applique pas correctement ?

- Vérifiez les noms des champs (ils sont sensibles à la casse)
- Assurez-vous que les types de valeurs correspondent (nombres vs chaînes)
- Consultez la console navigateur pour les erreurs éventuelles

