import ContentLayout from "~/partials/layout/content.layout.jsx";
import ContentOffGrid from "~/partials/plts/offgrid";

import { UseAuthCtx } from "~/context/auth.context";
import { useNavigate } from "@solidjs/router";

export default function OffGrid(props) {

  const navigate = useNavigate();
  const {auth} = UseAuthCtx();

  return (
    <ContentLayout title={"Off Grid"} >
        { auth() ? <ContentOffGrid /> : navigate(import.meta.env.VITE_REDIRECT_TO_LOGIN) }
    </ContentLayout>
  );
}
