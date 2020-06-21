export const fetchData = async (url) =>
  await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  });
