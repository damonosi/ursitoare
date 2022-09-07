import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "./../components/spinner/Spinner";
const HomePage = dynamic(() => import("../components/Main/index"), {
  suspense: true,
});
export default function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomePage />
    </Suspense>
  );
}
