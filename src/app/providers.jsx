"use client";

import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import { store, persistor } from "@/store/store";
import fetcher from "@/helpers/fetcher";

// Start rehydration without blocking first paint (no PersistGate).
void persistor;

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
    </Provider>
  );
}
