export interface VoiceactorsCharacters {
    animeId: number;
    character: {
      characterId: number;
      characterName: string;
      characterImage: string;
    };
    voiceActor: {
      voiceActorId: number;
      voiceActorName: string;
      voiceActorImage: string;
    };
  }