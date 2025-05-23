// category
export interface Category {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreateInput {
  name: string;
  description?: string;
  image?: string;
}

export interface CategoryUpdateInput {
  name?: string;
  description?: string | null;
  image?: string | null;
}
