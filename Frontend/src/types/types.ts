export interface HabitsType {
  _id?: string;
  title: string;
  description: string;
  category: string;
  priority: "important" | string;
  frequency: "daily";
}
