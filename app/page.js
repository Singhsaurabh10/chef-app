import { supabase } from "../lib/supabase";
import HomeClient from "./home_client";

export const revalidate = 60;

export default async function Home() {
  const { data: chefs } = await supabase
    .from("chefs")
    .select("*")
    .eq("is_active", true)
    .order("follower_count", { ascending: false });

  const cuisines = ["All", ...new Set((chefs || []).map((c) => c.cuisine_type))];

  return <HomeClient chefs={chefs || []} cuisines={cuisines} />;
}