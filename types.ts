
export enum AppMode {
  IMAGINE = 'imagine',
  GALLERY = 'gallery',
  ABOUT = 'about',
  TERMS = 'terms',
  PRIVACY = 'privacy',
  CONTACT = 'contact'
}

export enum Language {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  DE = 'de',
  ZH = 'zh',
  JA = 'ja'
}

export enum GenerationMode {
  STORY = 'story',
  SONG = 'song'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ImaginationResult {
  id: string;
  prompt: string;
  story: string;
  imageUrl?: string;
  videoUrl?: string;
  audioData?: string;
  sources: GroundingSource[];
  neuralPaths?: string[];
  timestamp: number;
}
