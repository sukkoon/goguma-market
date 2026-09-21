import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ListingCard from "@/components/listing-card";

export default async function MyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/mypage");
  }

  const [{ data: profile }, { data: listings }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("listings")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3 rounded-2xl border border-goguma-100 bg-white p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-goguma-100 text-2xl">
          🍠
        </div>
        <div>
          <p className="text-lg font-bold text-roast-700">
            {profile?.nickname ?? user.email}
          </p>
          <p className="text-sm text-roast-400">{user.email}</p>
        </div>
      </div>

      <h2 className="mb-2 mt-8 text-sm font-semibold text-roast-500">
        내가 등록한 물건 ({listings?.length ?? 0})
      </h2>

      {listings && listings.length > 0 ? (
        <ul className="flex flex-col divide-y divide-goguma-100">
          {listings.map((listing) => (
            <li key={listing.id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-sm text-roast-400">
          아직 등록한 물건이 없어요.
        </p>
      )}
    </div>
  );
}
