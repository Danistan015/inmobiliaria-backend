import { getInmuebleById } from "@/lib/api";

export default async function ProyectoDetalle({ params }: { params: { id: string } }) {
  const inmueble = await getInmuebleById(params.id);
  const data = inmueble?.attributes ?? inmueble;

  if (!data) {
    return (
      <main className="max-w-5xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-700">
          Proyecto no encontrado 😢
        </h1>
      </main>
    );
  }

  const imageUrl =
    data?.houseMainImage?.url
      ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${data.houseMainImage.url}`
      : "/no-image.jpg";

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-4">{data.houseName}</h1>
      <img
        src={imageUrl}
        alt={data.houseName}
        className="rounded-xl w-full h-[400px] object-cover mb-6"
      />

      <p className="text-gray-700 mb-6">{data.houseDescription}</p>

      <ul className="text-gray-600 space-y-2 mb-6">
        <li>🏙️ Tipo: {data.houseType}</li>
        <li>📐 Área: {data.houseArea} m²</li>
        <li>🛏️ Habitaciones: {data.houseRooms}</li>
        <li>🛁 Baños: {data.houseBathrooms}</li>
        <li>🚗 Garajes: {data.houseGarage}</li>
        <li>📞 Agente: {data.houseAgent}</li>
        <li>📱 Teléfono: {data.housePhone}</li>
      </ul>

      <button className="bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800 transition">
        Contactar Asesor
      </button>
    </main>
  );
}
