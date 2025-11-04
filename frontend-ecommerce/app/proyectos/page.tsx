import { getInmuebles } from "@/lib/api";
import Link from "next/link";

export default async function Proyectos() {
  const inmuebles = await getInmuebles();

  // 🔍 Debug opcional (puedes quitar luego)
  console.log("🔍 Inmuebles recibidos en página:", inmuebles);

  // Si no hay inmuebles
  if (!inmuebles || inmuebles.length === 0) {
    return (
      <main className="max-w-5xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-700">
          No hay proyectos disponibles 😔
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        Proyectos disponibles 🏡
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {inmuebles.map((item: any) => {
          // Compatible con Strapi v4 y v5
          const data = item?.attributes ?? item;
          if (!data) return null;

          // Imagen principal (si existe)
          const imageUrl =
            data?.houseMainImage?.url
              ? `${process.env.NEXT_PUBLIC_API_URL?.replace(
                  "/api",
                  ""
                )}${data.houseMainImage.url}`
              : "/no-image.jpg";

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={imageUrl}
                alt={data.houseName || "Proyecto inmobiliario"}
                className="h-60 w-full object-cover"
              />

              <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {data.houseName || "Sin nombre"}
                </h2>
                <p className="text-sm text-gray-600">
                  {data.houseType || "Tipo no especificado"}
                </p>
                <p className="text-green-700 font-bold">
                  $
                  {data.housePrice
                    ? data.housePrice.toLocaleString()
                    : "Precio no disponible"}
                </p>

                <Link
                  href={`/proyectos/${item.id}`}
                  className="block text-center bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
