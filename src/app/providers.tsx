"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </Provider>
  );
}
