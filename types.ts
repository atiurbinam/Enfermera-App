
export interface WebSource {
    uri: string;
    title: string;
}

export interface GroundingChunk {
    web: WebSource;
}

export interface Article {
    title: string;
    uri: string;
}
