import { Carousel } from "flowbite-react";

const Ccarousel: React.FC = () => {
  return (
    <div className="h-60 sm:h-64 xl:h-80 2xl:h-96 ">
      <Carousel
        onSlideChange={(index) => {
          // Removed console.log
        }}
      >
        <img
          src="https://mobirise.com/extensions/commercem4/assets/images/gallery02.jpg"
          alt="..."
        />
        <img
          src="https://mobirise.com/extensions/commercem4/assets/images/gallery04.jpg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        />
      </Carousel>
    </div>
  );
};

export default Ccarousel;
