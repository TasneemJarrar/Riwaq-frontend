import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pointsApi } from "../api/points";
import type {
  ActivityItem,
  ActivityType,
  PointsTransactionResponse,
  PurchasePointsRequest,
} from "../api/points";

export const pointsKeys = {
  all: ["points"] as const,
  balance: () => [...pointsKeys.all, "balance"] as const,
  transactions: () => [...pointsKeys.all, "transactions"] as const,
  packages: () => [...pointsKeys.all, "packages"] as const,
  purchases: () => [...pointsKeys.all, "purchases"] as const,
};

function mapTransactionType(tx: PointsTransactionResponse): ActivityType {
  const type = (tx.transactionType ?? "").toLowerCase();
  const amount = tx.amount;

  if (amount < 0 || type.includes("spend") || type.includes("redeem") || type.includes("exchange")) {
    return "spent";
  }
  if (type.includes("bonus") || type.includes("reward") || type.includes("profile")) {
    return "bonus";
  }
  return "earned";
}

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function mapTransactionToActivity(
  tx: PointsTransactionResponse
): ActivityItem {
  const type = mapTransactionType(tx);
  const reason = tx.reason?.trim() || "Points transaction";

  let meta = tx.transactionType ?? "Transaction";
  if (tx.mentoringSessionId) {
    meta = `Mentoring session`;
  }

  return {
    id: tx.id,
    type,
    title: reason,
    meta,
    amount: tx.amount,
    date: formatRelativeDate(tx.createdAt),
    createdAt: tx.createdAt,
  };
}

export function usePointsBalance() {
  return useQuery({
    queryKey: pointsKeys.balance(),
    queryFn: pointsApi.getBalance,
    staleTime: 30_000,
  });
}

export function usePointsTransactions() {
  return useQuery({
    queryKey: pointsKeys.transactions(),
    queryFn: pointsApi.getTransactions,
    staleTime: 30_000,
    select: (data) => data.map(mapTransactionToActivity),
  });
}

export function usePointsPackages() {
  return useQuery({
    queryKey: pointsKeys.packages(),
    queryFn: pointsApi.getPackages,
    staleTime: 5 * 60_000,
  });
}

export function usePointsPurchases() {
  return useQuery({
    queryKey: pointsKeys.purchases(),
    queryFn: pointsApi.getPurchases,
    staleTime: 60_000,
  });
}

export function usePurchasePoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PurchasePointsRequest) =>
      pointsApi.purchasePackage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pointsKeys.all });
    },
  });
}

/** Derived stats from transactions */
export function usePointsStats() {
  const { data: activities = [], isLoading, isError, error } =
    usePointsTransactions();

  const lifetimeEarned = activities
    .filter((a) => a.amount > 0)
    .reduce((sum, a) => sum + a.amount, 0);

  const pointsRedeemed = activities
    .filter((a) => a.amount < 0)
    .reduce((sum, a) => sum + Math.abs(a.amount), 0);

  const redeemedCount = activities.filter((a) => a.amount < 0).length;

  return {
    lifetimeEarned,
    pointsRedeemed,
    redeemedCount,
    isLoading,
    isError,
    error,
  };
}
