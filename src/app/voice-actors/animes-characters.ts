export interface AnimesCharacters {
    voiceActorId: number;
    character: {
      characterId: number;
      characterName: string;
      characterImage: string;
    };
    anime: {
      animeId: number;
      animeName: string;
      animeImage: string;
    };
}
