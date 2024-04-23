export interface VoiceactorsAnimes {
    characterId: number;
    voiceActor: {
      voiceActorId: number;
      voiceActorName: string;
      voiceActorImage: string;
    };
    anime: {
      animeId: number;
      animeName: string;
      animeImage: string;
    };
}
