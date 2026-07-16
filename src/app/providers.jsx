"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SWRConfig } from "swr";
import { store, persistor } from "@/store/store";
import fetcher from "@/helpers/fetcher";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
      </PersistGate>
    </Provider>
  );
}
