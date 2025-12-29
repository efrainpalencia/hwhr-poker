export type Rule = {
    id: string;
    categoryId: string;
    number?: string;
    title: string;
    text: string[];
    tags?: string[];
    source?: {pageStart?: number, pageEnd?: number};
};

export type RulebooksectionMeta = {
    id: string;
    title: string;
    path: string;
    description: string[];
};

export type RulebookIndex = {
    id: string;
    title: string;
    version: string;
    sections: RulebooksectionMeta[];
};

export type RulebookSectionData = {
    sectionId: string;
    title: string;
    rules: Rule[];
};