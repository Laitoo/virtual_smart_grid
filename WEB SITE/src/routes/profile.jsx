import ContentLayout from "~/partials/layout/content.layout.jsx";
import ContentPLTB from "~/partials/pltb";
import ContentProfile from "~/partials/profile";

export default function Profile() {  

  return (
    <ContentLayout title={`User Profile`} >
        <ContentProfile />
    </ContentLayout>
  );

}
