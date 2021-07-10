import React from "react";
import SettingsSection from "components/SettingsSection";
import { useRouter } from "next/router";
import { requireAuth } from "util/auth.js";

function SettingsPage(props) {
  const router = useRouter();

  return (
    <SettingsSection
      color="white"
      size="medium"
      backgroundImage=""
      backgroundImageOpacity={1}
      buttonColor="primary"
      buttonInverted={false}
      section={router.query.section}
      key={router.query.section}
    />
  );
}

// Tell Next.js to export static files for each settings page
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = () => ({
  paths: [
    { params: { section: "general" } },
    { params: { section: "password" } },
    { params: { section: "billing" } },
  ],
  fallback: true,
});

export function getStaticProps({ params }) {
  return { props: {} };
}

export default requireAuth(SettingsPage);
