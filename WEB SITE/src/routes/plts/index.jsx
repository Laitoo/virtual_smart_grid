import ContentPLTS from "~/partials/plts";
import ContentLayout from "~/partials/layout/content.layout.jsx";

import { createEffect, Show } from "solid-js";
import { UseAuthCtx } from "~/context/auth.context";
import { useNavigate } from "@solidjs/router";

export default function PLTS() {

  const navigate = useNavigate();
  const { auth } = UseAuthCtx()

  return (
    <ContentLayout title={"PLTS"} >
      {auth() ? <ContentPLTS /> : navigate(import.meta.env.VITE_REDIRECT_TO_LOGIN)}
    </ContentLayout>
  );
}
