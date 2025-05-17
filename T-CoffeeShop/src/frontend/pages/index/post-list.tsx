import React, { FC, Suspense, useState } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { postState } from "state";
import { Box } from "zmp-ui";
import { useNavigate } from "react-router-dom"; // 👈 THÊM

export const PostListContent: FC = () => {
  const posts = useRecoilValue(postState);
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate(); // 👈 THÊM

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <Section title="Danh sách bài viết">
      <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate(`/postDetail/${post.id}`, { state: post })} 
          >
            <h3 className="font-bold text-base">{post.title}</h3>
          </div>
        ))}
      </Box>

      {visibleCount < posts.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-green text-white rounded hover:bg-green-600 transition"
          >
            Xem thêm
          </button>
        </div>
      )}
    </Section>
  );
};
