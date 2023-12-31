import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";


export default function ProductCard({ product, onDelete }) {

  const handleDelete = async () => {
    try {
      // Make an HTTP request to your server to delete the product
      await axios.delete(`/api/product/${product._id}`);
      // Call the onDelete callback to update the UI or perform additional actions
      onDelete(product._id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };



  
  return (
    <div className={styles.product}>
      <h1 className={styles.product__name}>{product.name}</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        style={{ padding: "5px 0 5px 5px" }}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {product.subProducts.map((p, i) => (
          <SwiperSlide>
            <div className={styles.product__item}>
              <div className={styles.product__item_img}>
                <img src={p.images[0].url} alt="" />
              </div>
              <div className={styles.product__actions}>
                {/* <Link href={`/admin/dashboard/product/${product._id}`}>
                  <TbEdit />
                </Link> */}
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <AiOutlineEye />
                </Link>
                <Link href="">
                  <RiDeleteBin2Line onClick={handleDelete} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
