import { ReactNode } from "react";

export default function ButtonsCont({ children }: { children: ReactNode }) {
  return <div className="flex flex-col sm:flex-row  gap-2">{children}</div>;
}
