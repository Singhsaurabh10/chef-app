import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data: chefs, error } = await supabase
    .from("chefs")
    .select("*");

  console.log(chefs, error);

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🍽️ Discover Chefs
      </h1>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        
        {chefs && chefs.length > 0 ? (
          chefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  {chef.name?.[0]}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{chef.name}</h2>
                  <p className="text-sm text-gray-500">
                    {chef.specialty}
                  </p>
                </div>
              </div>

              <button className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                Follow
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500">
            No chefs found
          </p>
        )}

      </div>
    </div>
  );
}