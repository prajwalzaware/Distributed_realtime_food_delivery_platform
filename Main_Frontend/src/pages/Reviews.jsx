import { useEffect, useRef } from "react";

const Reviews = () => {
    const bannerRef = useRef(null);

  useEffect(() => {
    if (bannerRef.current) {
      const navHeight = 290; // Height of the sticky navigation
      const headerOffset = bannerRef.current.offsetTop - navHeight;
      
      window.scrollTo({
        top: headerOffset,
        behavior: "smooth"
      });
    }
  }, []);
 
  return (
    <div ref={bannerRef} className="flex flex-col max-h-full top-[100px] sticky-menu " >Reviews
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    <p>as</p>
    </div>
  )
}

export default Reviews