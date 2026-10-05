import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { RootCtxProvider } from "./context";
// import MainLayout from "./partials/layout/main.layout";
import MainLayout from "./partials/layout/responsive/main.responsive.layout";

export default function App() {
  return (
    <Router
      root={(props) => (
        <RootCtxProvider>
          <MainLayout>
            <Suspense>{props.children}</Suspense>
          </MainLayout>
        </RootCtxProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
