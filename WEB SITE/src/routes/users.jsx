import ContentLayout from "~/partials/layout/content.layout.jsx";
import ContentUsers from "~/partials/users";

export default function Users() {  

  return (
    <ContentLayout title={`Pengaturan User`} >
        <ContentUsers />
    </ContentLayout>
  );

}
