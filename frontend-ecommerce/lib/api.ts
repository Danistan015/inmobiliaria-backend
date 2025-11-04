const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

export async function getInmuebles() {
  const url = `${API_URL}/inmobiliarias?populate=*`;
  console.log("📡 Llamando a:", url);

  try {
    const res = await fetch(url, { cache: "no-store" });
    console.log("🔢 Status:", res.status);
    const data = await res.json();
    console.log("📦 Respuesta del backend:", data);
    return data.data;
  } catch (error) {
    console.error("❌ Error en getInmuebles:", error);
    return [];
  }
}


export async function getInmuebleById(id: string) {
  const res = await fetch(`${API_URL}/inmobiliarias/${id}?populate=*`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener el inmueble");
  const data = await res.json();
  return data.data;
}
