export interface Itopic {
  title: string;
  body: string;
  slug: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface IcraeteTopicForm {
  title: string;
  body: string;
}