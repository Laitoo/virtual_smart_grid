import { SOCKET_TAG } from "~/json/socket-tag-json";
import ContentLayout from "~/partials/layout/content.layout.jsx";
import ContentPV from "~/partials/plts/pv";

export default function PV(props) {

  return (
    <ContentLayout title={"PV"} >
        <ContentPV />
    </ContentLayout>
  );
}
