"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { AIFeature } from "@/types"

interface AIFeaturesProps {
  features: AIFeature[]
  selectedFeature: string | null
  onFeatureClick: (feature: AIFeature) => void
}

export default function AIFeatures({ features, selectedFeature, onFeatureClick }: AIFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => {
        const IconComponent = feature.icon
        return (
          <Card
            key={feature.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedFeature === feature.id ? "ring-2 ring-red-500 shadow-lg" : ""
            }`}
            onClick={() => onFeatureClick(feature)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
