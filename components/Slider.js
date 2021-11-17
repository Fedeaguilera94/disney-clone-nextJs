import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/Image";

function Slider() {
  return (
    <div className="main-video">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img src="/baner-1.jpg" />
        </div>
        <div>
          <img src="/baner-2.jpg" alt="img2" />
        </div>
        <div>
          <img src="/baner-3.jpg" alt="img3" />
        </div>
      </Carousel>
    </div>
  );
}

export default Slider;
