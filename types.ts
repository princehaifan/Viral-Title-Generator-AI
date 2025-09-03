
export enum Tier {
    S = 'S-Tier',
    A = 'A-Tier',
    B = 'B-Tier'
}

export interface GeneratedTitle {
    id: string;
    text: string;
    tier: Tier;
}
