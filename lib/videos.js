export const getCommonVideosLocal = async (data) => {
  return data.items.map((item) => {
    const id = item.id?.videoId || item.id;
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id,
    };
  });
};

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY_EXTRA_2 = process.env.YOUTUBE_API_KEY_EXTRA_2;

  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=14&key=${YOUTUBE_API_KEY_EXTRA_2}`,
    );
    const data = await response.json();

    if (data?.error) {
      console.error("Youtube api error", data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet?.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      };
    });
  } catch (error) {
    console.log("Something went wrong with the video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2C%20contentDetails%2C%20statistics&chart=mostPopular&regionCode=CL";
  return getCommonVideos(URL);
};
