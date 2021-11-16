import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
          <img src="/baner-1.jpg" alt="img" />
        </div>
        <div>
          <img src="/baner-2.jpg" alt="img" />
        </div>
        <div>
          <img src="/baner-3.jpg" alt="img" />
        </div>
      </Carousel>
    </div>
  );
}

export default Slider;
