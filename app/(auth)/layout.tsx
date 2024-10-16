import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <main className="flex min-h-svh w-full items-center justify-center">{children}</main>;
};

export default layout;
