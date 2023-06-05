import { Box, Button } from "@mui/material";
import { FC } from "react";
import { Size } from "src/core/product/entity";

interface Props {
  selectedSize?: Size;
  sizes: Size[];
  changeSelectedSize: (size: Size) => void;
}

const SizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  changeSelectedSize
}) => {
  return sizes && sizes.length > 0 ? (
    <Box display="flex" justifyContent="space-between">
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
          onClick={() => changeSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  ) : (
    <></>
  );
};

export default SizeSelector;
