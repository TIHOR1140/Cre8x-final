export type PageId = 'malani' | 'dilrukshi' | 'arjun' | 'doctor';

export type AmbientState = 'normal' | 'tablet' | 'night' | 'bathroom';

export interface AmbientStateConfig {
  id: AmbientState;
  label: string;
  sublabel: string;
  glowColor: string;
  glowClass: string;
  roomDesc: string;
  sinhalaVoice: string;
  englishSub: string;
  agentIntent: string;
  lightRingHex: string;
}

export type DilrukshiState = 'normal' | 'emergency';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  status: 'past' | 'current' | 'future';
  icon: string;
}

export interface ClinicalMetric {
  title: string;
  status: 'safe' | 'warning' | 'optimal';
  headline: string;
  detail: string;
  badge: string;
}

