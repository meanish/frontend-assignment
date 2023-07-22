import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

interface StarRatingProps {
  stars: number;
}

const StarRating: React.FC<StarRatingProps> = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (_elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" color="orange" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" color="orange" />
        ) : (
          <AiOutlineStar className="icon" color="orange" />
        )}
      </span>
    );
  });

  return <div className="flex text-lg">{ratingStar}</div>;
};

export default StarRating;
