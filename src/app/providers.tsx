"use client";

import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </Provider>
  );
}