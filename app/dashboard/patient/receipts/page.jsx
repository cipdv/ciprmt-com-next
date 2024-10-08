import { Suspense } from "react";
import Receipts from "@/components/patients/Receipts";
import { getSession, getReceipts } from "@/app/_actions";
import { redirect } from "next/navigation";

async function getUserDetails() {
  const currentUser = await getSession();
  if (!currentUser) {
    redirect("/sign-in");
  }
  return currentUser.resultObj;
}

async function requestReceipts(userId) {
  const receipts = await getReceipts(userId);
  return receipts;
}

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default async function HealthHistoryPage() {
  const user = await getUserDetails();
  const receipts = await requestReceipts(user._id);

  return (
    <section className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingFallback />}>
        <Receipts user={user} receipts={receipts} />
      </Suspense>
    </section>
  );
}
