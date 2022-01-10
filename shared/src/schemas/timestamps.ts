export enum TimestampField {
  id = "id",

  _created_at = "_created_at",
  _updated_at = "_updated_at",
}

export interface Timestamp {
  [TimestampField.id]: string;

  [TimestampField._created_at]: string;
  [TimestampField._updated_at]: string;
}
