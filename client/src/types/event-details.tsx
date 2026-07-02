export type EventStatus = "upcoming" | "completed" | "cancelled";

export interface EventType {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  deadDate: Date;
  location: string;
  imageUrl?: string;
  createdBy?: string;
  category: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  registered: boolean;
  registrationCount: number;
  maxParticipants: number;
}
