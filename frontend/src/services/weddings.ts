import apiClient from "./apiClient";

export interface Wedding {
    id: number;
    name: string;
    date: string;
    location: string;
    created_at: Date;
}

export const weddingService = {
    async getWeddings(): Promise<Wedding[]>{
        
    }