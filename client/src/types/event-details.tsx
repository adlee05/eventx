export type EventStatus = "upcoming" | "completed" | "cancelled";

export interface EventType {
  _id?: string;

  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location: string;

  imageUrl?: string;

  createdBy?: string;

  registeredUsers?: string[];
  attendees?: string[];

  certificateTemplateUrl?: string;

  status?: EventStatus;

  certificateText?: string;
  category: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
}
