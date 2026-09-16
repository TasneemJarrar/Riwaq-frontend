export type ActivityType = "earned" | "spent" | "bonus";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  meta: string;
  amount: number;
  date: string;
}

export interface EarnRequest {
  id: string;
  tag: string;
  tagClassName: string;
  title: string;
  eta: string;
}

export const activityItems: ActivityItem[] = [
  {
    id: "a1",
    type: "earned",
    title: "Taught React Systems to Maya Lin",
    meta: "Verified mentoring session • 48 mins",
    amount: 100,
    date: "Yesterday",
  },
  {
    id: "a2",
    type: "spent",
    title: "Exchanged for 1 connection request",
    meta: "Starter Pack • Unlocked Dr. Alex Mercer",
    amount: -100,
    date: "3 days ago",
  },
  {
    id: "a3",
    type: "earned",
    title: "Taught Python Basics to Lucas Silva",
    meta: "Verified mentoring session • 60 mins",
    amount: 100,
    date: "Oct 12",
  },
  {
    id: "a4",
    type: "bonus",
    title: "Profile completion bonus",
    meta: "Verified skills & GitHub sync",
    amount: 50,
    date: "Oct 10",
  },
];

export const earnRequests: EarnRequest[] = [
  {
    id: "r1",
    tag: "TypeScript",
    tagClassName: "bg-success-soft text-success-text",
    title: "Zack T. is looking for generic type debugging",
    eta: "~30 mins",
  },
  {
    id: "r2",
    tag: "UI Architecture",
    tagClassName:
      "bg-gamification-soft text-gamification-text",
    title: "Nour E. needs a design token setup review",
    eta: "~45 mins",
  },
];