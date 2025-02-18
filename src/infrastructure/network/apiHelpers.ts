// src/core/utils/network/apiHelpers.ts

/**
 * Maneja la respuesta de una llamada API verificando si hubo un error.
 * @param response Respuesta de la API.
 * @returns La respuesta en formato JSON si es exitosa.
 * @throws Error en caso de que la respuesta no sea OK.
 */
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la respuesta del API');
  }
  return response.json();
};
