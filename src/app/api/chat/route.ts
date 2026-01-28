import { NextRequest, NextResponse } from 'next/server';
import { ChatMessage } from '@/lib/types';

// Système de matching simple basé sur mots-clés
// À améliorer avec un vrai LLM (OpenAI, Anthropic, etc.)
const analyzeIntent = (message: string) => {
  const lowerMessage = message.toLowerCase();
  
  // Détection des cas d'usage
  if (lowerMessage.includes('web') || lowerMessage.includes('site') || lowerMessage.includes('application')) {
    return {
      intent: 'hosting',
      products: ['Instances', 'Load Balancer'],
      response: "Pour héberger une application web, je recommande les **Instances** pour le compute et un **Load Balancer** pour distribuer la charge. Souhaitez-vous des instances optimisées pour le CPU ou la mémoire ?"
    };
  }
  
  if (lowerMessage.includes('stockage') || lowerMessage.includes('données') || lowerMessage.includes('backup')) {
    return {
      intent: 'storage',
      products: ['Object Storage', 'Block Storage', 'File Storage'],
      response: "Pour le stockage, OVHcloud propose plusieurs solutions :\n- **Object Storage** : stockage d'objets à grande échelle (idéal pour backups, médias)\n- **Block Storage** : stockage bloc haute performance\n- **File Storage** : partage de fichiers NFS\n\nQuel type de données souhaitez-vous stocker ?"
    };
  }
  
  if (lowerMessage.includes('ia') || lowerMessage.includes('ml') || lowerMessage.includes('machine learning') || lowerMessage.includes('ai')) {
    return {
      intent: 'ai',
      products: ['GPU Instances', 'Data Platform'],
      response: "Pour l'IA et le Machine Learning, je recommande :\n- **GPU Instances** : instances avec GPU NVIDIA pour l'entraînement de modèles\n- **Data Platform** : plateforme data complète avec Spark, Jupyter, etc.\n\nAvez-vous besoin de GPU pour l'entraînement ou plutôt d'une plateforme data ?"
    };
  }
  
  if (lowerMessage.includes('base de données') || lowerMessage.includes('database') || lowerMessage.includes('bdd')) {
    return {
      intent: 'database',
      products: ['Managed Databases'],
      response: "Pour les bases de données, OVHcloud propose des **Managed Databases** (PostgreSQL, MySQL, MongoDB, Redis, etc.) entièrement gérées. Quel type de base de données utilisez-vous ?"
    };
  }
  
  if (lowerMessage.includes('kubernetes') || lowerMessage.includes('conteneur') || lowerMessage.includes('docker')) {
    return {
      intent: 'containers',
      products: ['Managed Kubernetes'],
      response: "Pour les conteneurs, je recommande **Managed Kubernetes Service** : cluster Kubernetes entièrement géré et compatible avec l'écosystème Cloud Native. Combien de nœuds prévoyez-vous ?"
    };
  }
  
  // Cas par défaut
  return {
    intent: 'general',
    products: [],
    response: "Je peux vous aider à trouver les produits adaptés à vos besoins. Pouvez-vous me donner plus de détails sur votre cas d'usage ?",
    suggestions: [
      "Je veux héberger une application web",
      "J'ai besoin de stockage de données",
      "Je cherche une solution pour l'IA/ML",
      "J'ai besoin d'une base de données"
    ]
  };
};

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();
    
    // Analyser l'intention
    const analysis = analyzeIntent(message);
    
    // Construire la réponse
    const responseMessage: ChatMessage = {
      role: 'assistant',
      content: analysis.response,
      suggestions: analysis.suggestions,
      products: analysis.products.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        brick: 'Public Cloud',
        subType: 'Pay as you go',
        useCases: [],
        recommendations: []
      }))
    };
    
    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

