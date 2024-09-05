import { LucideProps } from "lucide-react";

export interface MenuItem {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  href: string;
  isAdmin: boolean;
  disabled?: boolean;
}
