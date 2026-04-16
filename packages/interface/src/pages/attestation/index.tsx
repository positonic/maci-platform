import dynamic from "next/dynamic";
import Head from "next/head";

const AttestationPortal = dynamic(
  async () => {
    const { AttestationPortal: Portal } = await import("~/features/attestation/components/AttestationPortal");
    return Portal;
  },
  { ssr: false },
);

const AttestationPage = (): JSX.Element => (
  <>
    <Head>
      <title>Tor Community Attestation Portal</title>

      <meta content="Verify your Tor community membership to participate in privacy funding" name="description" />
    </Head>

    <AttestationPortal />
  </>
);

export default AttestationPage;
