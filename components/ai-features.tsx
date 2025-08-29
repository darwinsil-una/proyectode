"use client"

import { Card, CardContent } from "@/components/ui/card"
import styles from "./ai-assistant.module.css"

interface Feature {
  id: string
  title: string
  description: string
  icon: any
  color: string
  prompt: string
}

interface AIFeaturesProps {
  features: Feature[]
  selectedFeature: string | null
  onFeatureClick: (feature: Feature) => void
}

export default function AIFeatures({ features, selectedFeature, onFeatureClick }: AIFeaturesProps) {
  return (
    <div className={styles.featuresGrid}>
      {features.map((feature) => {
        const IconComponent = feature.icon
        return (
          <Card
            key={feature.id}
            className={`${styles.featureCard} ${selectedFeature === feature.id ? styles.selected : ""}`}
            onClick={() => onFeatureClick(feature)}
          >
            <CardContent className={styles.featureContent}>
              <div className={`${styles.featureIcon} ${feature.color}`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
