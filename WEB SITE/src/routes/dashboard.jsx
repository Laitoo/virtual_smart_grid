import { createSignal, createEffect } from "solid-js";
import ContentDashboard from "~/partials/dashboard";
import ContentLayout from "~/partials/layout/content.layout.jsx";
import Preload from "~/components/Preload";
import { AuthCtx, UseAuthCtx } from "~/context/auth.context";

export default function Dashboard() {

  const { auth } = UseAuthCtx();

  return (
    <ContentLayout title={"Dashboard"} >
      {auth() ? <ContentDashboard /> : <Preload />}
    </ContentLayout>
  );
}