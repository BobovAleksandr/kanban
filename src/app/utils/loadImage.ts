const url = 'https://api.imageban.ru/v1';
const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;

export default async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': `TOKEN ${clientID}`,
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data.error.message || 'Ошибка при загрузке',
        status: response.status
      };
    }

    return data;

  } catch (error) {
    return {
      error: true,
      message: 'Сетевая ошибка при загрузке',
      originalError: error
    };
  }
}