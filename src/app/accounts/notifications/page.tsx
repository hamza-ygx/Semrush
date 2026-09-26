import { Notifications } from "@/features/account/Notifications";
import { notificationGroups, type NotificationKey } from "@/features/account/data";

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string | string[] }> }) {
  const { tab } = await searchParams;
  const key = notificationGroups.find((g) => g.key === tab)?.key ?? "agency";
  return <Notifications tab={key as NotificationKey} />;
}
