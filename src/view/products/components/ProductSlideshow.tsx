import { FC } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideshow.module.css";

interface Props {
  images: string[];
}

const ProductSlideshow: FC<Props> = ({ images }) => {
  return images && images.length > 0 ? (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        const url = `${image}`;
        return (
          <div className={styles["each-slide"]} key={image}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  ) : (
    <></>
  );
};

export default ProductSlideshow;
