import { supabase } from "../../../lib/supabase";
import ChefClient from "./ChefClient";
import { notFound } from "next/navigation";

export default async function ChefPage({ params }) {
  const { slug } = await params;

  const { data: chef } = await supabase
    .from("chefs")
    .select("*")
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .eq("is_active", true)
    .single();

  if (!chef) return notFound();

  const { data: dishes } = await supabase
    .from("dishes")
    .select("*")
    .eq("chef_id", chef.id)
    .eq("is_active", true);

  return <ChefClient chef={chef} dishes={dishes || []} />;
}