import ContentLayout from "~/partials/layout/content.layout.jsx";
import ContentOnGrid from "~/partials/plts/ongrid";

import { UseAuthCtx } from "~/context/auth.context";
import { useNavigate } from "@solidjs/router";

export default function OnGrid() {

  const navigate = useNavigate()
  const {auth} = UseAuthCtx()

  return (
    <ContentLayout title={"On Grid"} >
      {auth() ? <ContentOnGrid /> : navigate(import.meta.env.VITE_REDIRECT_TO_LOGIN)}        
    </ContentLayout>
  );
}
