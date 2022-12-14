import { YOUTUBE_API_KEY_IN_USE } from "../config/config";

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
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY_IN_USE}`,
    );
    const data = await response.json();

    if (data?.error) {
      console.error("Youtube api error", data.error);
      return [];
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      const snippet = item.snippet;
      return {
        title: snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet.description.substring(0, 800).concat("..."),
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
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

const normalizeVideo = (item) => {
  return {
    title: item.items[0].snippet.title,
    publishTime: item.items[0].snippet.publishedAt,
    description: item.items[0].snippet.description
      .substring(0, 800)
      .concat("..."),
    channelTitle: item.items[0].snippet.channelTitle,
    // tags: item.items[0].snippet.tags,
  };
};

export const getVideoById = async (id) => {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${YOUTUBE_API_KEY_IN_USE}`,
  );
  const item = await response.json();
  return normalizeVideo(item);
};

export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

  return getCommonVideos(URL);
};
