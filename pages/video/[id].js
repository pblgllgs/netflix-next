import { Video } from "../../components";
import { getVideoById } from "../../lib/videos";

const VideoPage = ({ item }) => {
  return <Video item={item} />;
};

export default VideoPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const item = await getVideoById(id);
  return {
    props: {
      item,
    },
  };
};
