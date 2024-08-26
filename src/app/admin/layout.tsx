import { AdminLayout } from "@/components/layouts/admin-layout";

export default function AdminLayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
