import React, { FC, Suspense, useState } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";

export const ProductListContent: FC = () => {
  // show variant in homepage when clicked (productsState)
  const products = useRecoilValue(productsState);

  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  }

  const visibleProducts = products.slice(0, visibleCount); 

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {visibleProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>

      {/* See more products button */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-green text-white rounded"
          >
            Xem thêm
          </button>
        </div>
      )}
    </Section>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
