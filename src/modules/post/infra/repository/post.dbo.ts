export type PostDBO = {
  id?: string;
  title: string;
  content: string;
  image: string;
  userId: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
