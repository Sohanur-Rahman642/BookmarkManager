export interface BookMark{
    title: string, 
    url: string,
}

export interface Category{
    name: string,
    bookmarks: BookMark[]
}

export interface BookMarkState{
    categories: Record<string, Category>
}