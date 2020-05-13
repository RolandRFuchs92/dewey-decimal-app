export type AuthorsQuerySelectListModel = {
  name: string;
  second_name: string;
  surname: string;
  pk: number;
};

export type AuthorSchema = {
  author_id?: number;
  name: string;
  second_name: string;
  surname: string;
};

export type TableAuthorSchema = {} & AuthorSchema;
