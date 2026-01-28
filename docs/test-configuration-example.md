# Exemple de Test - Configuration Automatique

## Comment tester la fonctionnalité

### 1. Ouvrir le Chatbot

1. Allez sur la page principale de l'application
2. Cliquez sur le bouton **"Assistant configuration"** en haut à droite de "Configuration 1"
3. Le drawer du chatbot s'ouvre sur la droite

### 2. Demander des Configurations

Essayez l'une de ces phrases pour demander des configurations :

- "Propose-moi 3 configurations pour héberger une application web"
- "J'ai besoin de configurations pour un site e-commerce"
- "Quelles sont les meilleures configurations pour une base de données ?"
- "Je veux héberger une application ML, propose-moi des configurations"

### 3. Réponse de l'IA (Format Attendu)

L'IA devrait répondre avec quelque chose comme :

```
Je vous propose 3 configurations adaptées à votre besoin :

### Configuration Économique

```json
{
  "name": "Configuration Économique",
  "cpu": 2,
  "memoire": 8,
  "blockStorage": 100,
  "ipPubliques": 1,
  "stockageS3": 50,
  "localisation": "paris",
  "region": "eu-west",
  "resilience": "1az"
}
```

Cette configuration offre un bon rapport qualité-prix pour démarrer.

### Configuration Standard

```json
{
  "name": "Configuration Standard",
  "cpu": 4,
  "memoire": 16,
  "blockStorage": 200,
  "ipPubliques": 2,
  "stockageS3": 500,
  "localisation": "paris",
  "region": "eu-west",
  "resilience": "2az"
}
```

Idéale pour la plupart des applications web en production.

### Configuration Performance

```json
{
  "name": "Configuration Performance",
  "cpu": 8,
  "memoire": 32,
  "blockStorage": 500,
  "ipPubliques": 2,
  "stockageS3": 1000,
  "localisation": "paris",
  "region": "eu-west",
  "resilience": "3az"
}
```

Pour les applications à fort trafic nécessitant haute disponibilité.
```

### 4. Vérifier l'Affichage des Boutons

Après la réponse de l'IA, vous devriez voir :

1. Le texte de la réponse avec les explications
2. Un message : **"Quelle configuration souhaitez-vous appliquer ?"**
3. Trois boutons bleus, un pour chaque configuration :
   - ✓ Configuration Économique
   - ✓ Configuration Standard
   - ✓ Configuration Performance

### 5. Appliquer une Configuration

1. Cliquez sur l'un des boutons (par exemple : "Configuration Standard")
2. Une alerte de confirmation apparaît : "Configuration 'Configuration Standard' appliquée avec succès !"
3. Vérifiez que les valeurs dans le formulaire "Configuration 1" ont été mises à jour :
   - CPU devrait être : 4
   - Mémoire devrait être : 16
   - Block Storage devrait être : 200
   - etc.

### 6. Test avec le Backend Réel

Si votre backend est configuré pour retourner des configurations, testez avec ces questions :

```
# Question simple
"Propose-moi une configuration pour une application web"

# Question avec contraintes
"Je veux une configuration avec au moins 8 CPU et 32GB de RAM"

# Question comparative
"Compare-moi les configurations pour du dev et de la prod"

# Question avec budget
"Quelle configuration pour moins de 100€/mois ?"
```

## Test Manuel (Sans Backend)

Pour tester sans backend, vous pouvez :

1. Ouvrir la console développeur (F12)
2. Simuler une réponse du chatbot avec configurations
3. Vérifier que les boutons s'affichent et fonctionnent

### Code de Test (Console)

```javascript
// Simuler l'ajout d'un message avec configurations
const testMessage = {
  id: Date.now(),
  text: `Voici mes recommandations :

\`\`\`json
{
  "name": "Config Test",
  "cpu": 4,
  "memoire": 16,
  "blockStorage": 200
}
\`\`\`
`,
  sender: 'bot',
  configurations: [
    {
      name: "Config Test",
      cpu: 4,
      memoire: 16,
      blockStorage: 200
    }
  ]
};

console.log('Message de test créé:', testMessage);
```

## Problèmes Courants et Solutions

### Les boutons ne s'affichent pas

**Problème** : Le message du bot ne contient pas de boutons de configuration

**Solutions** :
1. Vérifiez que la réponse contient des blocs JSON valides
2. Assurez-vous que chaque bloc a un champ `name`
3. Vérifiez la console pour les erreurs de parsing JSON
4. Le format doit être exactement : \`\`\`json ... \`\`\`

### La configuration ne s'applique pas

**Problème** : Cliquer sur le bouton ne met pas à jour le formulaire

**Solutions** :
1. Vérifiez que la fonction `onApplyConfiguration` est bien passée au ChatbotModal
2. Regardez les noms des champs dans la configuration JSON
3. Vérifiez la console pour les erreurs
4. Les noms de champs doivent correspondre exactement à l'état du formulaire

### L'alerte ne s'affiche pas

**Problème** : Pas de confirmation après avoir cliqué

**Solutions** :
1. Vérifiez que le navigateur n'a pas bloqué les alertes
2. Consultez la console pour les erreurs JavaScript
3. Assurez-vous que la fonction `handleApplyConfiguration` est appelée

## Checklist de Validation

- [ ] Le bouton "Assistant configuration" ouvre le drawer
- [ ] Le chatbot répond aux questions
- [ ] Les configurations JSON sont détectées
- [ ] Le message "Quelle configuration souhaitez-vous appliquer ?" s'affiche
- [ ] Les boutons de configuration sont visibles et stylisés
- [ ] Cliquer sur un bouton applique la configuration
- [ ] Une alerte de confirmation s'affiche
- [ ] Les valeurs du formulaire sont mises à jour
- [ ] Le calcul des coûts est mis à jour automatiquement

## Améliorations Futures

1. Remplacer l'alerte par une notification toast
2. Ajouter une animation lors de l'application de la configuration
3. Permettre de comparer plusieurs configurations
4. Ajouter un bouton "Annuler" pour revenir à la configuration précédente
5. Historique des configurations appliquées
6. Export des configurations en PDF

