import { FC } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import { useLocation, useParams} from "react-router-dom";
import React from "react";

const PostDetail: FC = () => {
  const location = useLocation();
  const { id } = useParams();
  const post = location.state;

  const OrderHistoryPageWrapper = ({ children }) => {
    return (
      <Page className="flex flex-col">
        <Header title="Chi tiết bài viết" showBackIcon={true} />
        {children}
      </Page>
    );
  };

  if (!post) {
    return (
      <Box className="p-4">
        <Text className="text-red-500">
          Không tìm thấy bài viết với ID: {id}
        </Text>
      </Box>
    );
  }

  return (
    <OrderHistoryPageWrapper>
      <Box className="p-4 space-y-4">
        <Text className="text-2xl font-bold">{post.title}</Text>
        <Text>{post.content}</Text>
      </Box>
    </OrderHistoryPageWrapper>
  );
};

export default PostDetail;
