import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import googleIcon from "../public/assets/google-icon.png";

const LoginPage = ({ providers }) => {
  const { data, status } = useSession();
  console.log({ data, status });

  const router = useRouter();

  if (status === "loading") {
    return "";
  }

  if (data) {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key="">
          <button
            className="bg-twitterWhite pl-2 pr-5 py-2 text-black rounded-full flex items-center gap-2"
            onClick={async () => await signIn(provider.id)}
          >
            <Image
              className="w-8 h-8"
              src={googleIcon}
              alt="Google Auth"
              width="auto"
              height="auto"
            />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LoginPage;

//
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
