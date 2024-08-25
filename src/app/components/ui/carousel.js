import { useSwipeable } from "react-swipeable";
import React, { useState, useRef, useEffect } from "react";
import "./carousel.css";

const NEXT = "next";
const PREV = "prev";

const getOrder = (index, pos, numItems) => {
  if (index - pos < 0) {
    return numItems - Math.abs(index - pos);
  } else {
    return index - pos;
  }
};

export default function Carousel({ children }) {
  const numItems = React.Children.count(children);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState("");
  const [pos, setPos] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const slotRefs = useRef([]); // Create an array of refs

  const slideNext = () => {
    setSliding(true);
    setDirection(NEXT);
    setPos(pos === numItems - 1 ? 0 : pos + 1);

    setTimeout(stopSliding, 50);
  };

  const slidePrev = () => {
    setSliding(true);
    setDirection(PREV);
    setPos(pos === 0 ? numItems - 1 : pos - 1);

    setTimeout(stopSliding, 50);
  };

  const stopSliding = () => setSliding(false);

  const slide = (direction) => {
    if (direction === NEXT) {
      slideNext();
    } else {
      slidePrev();
    }
    window.scrollTo(0, 0);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventScrollOnSwipe: true,
  });

  // Update maxHeight when pos changes. This makes it so that the individal slides are only as tall as they need to be.
  useEffect(() => {
    if (slotRefs.current[pos]) {
      // Calculate the combined height of the elements within the current .carousel-slot
      const slot = slotRefs.current[pos];
      let totalHeight = 0;
      Array.from(slot.children).forEach((child) => {
        totalHeight += child.offsetHeight;
      });
      setMaxHeight(totalHeight);
    }
  }, [pos, children]);

  return (
    <div {...handlers}>
      <div className="wrapper">
        <div
          className={`carousel-container ${direction} ${
            sliding ? "sliding" : ""
          }`}
          style={{ maxHeight: `${maxHeight}px` }} // Set max-height dynamically
        >
          {React.Children.map(children, (child, index) => (
            <div
              className={`carousel-slot ${index === pos ? "active" : ""}`}
              ref={(el) => (slotRefs.current[index] = el)} // Assign refs to each slot
              style={{ order: getOrder(index, pos, numItems) }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
