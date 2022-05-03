export interface IPagination {
    perPage: 10;
    currentPage: IPaginationChunk;
}

export type IPaginationChunk = 10 | 20 | 30 | 40 | 50;
