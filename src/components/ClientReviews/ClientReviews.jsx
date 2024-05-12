import React from "react";
import "./ClientReviews.css";
import Review_Card from "./Review_Card";

function ClientReviews() {
  return (
    <div className="bg-rev">
      <div className="reviews-container">
        <Review_Card
          stars_icon={
            <i class="fa-solid fa-star">
              <i class="fa-solid fa-star">
                <i class="fa-solid fa-star">
                  <i class="fa-solid fa-star">
                    <i class="fa-solid fa-star"></i>
                  </i>
                </i>
              </i>
            </i>
          }
          review_desc={
            "Shoesnap has the best selection of stylish and durable shoes for every occasion!"
          }
          avatar_link={"https://xsgames.co/randomusers/avatar.php?g=male"}
        />
        <Review_Card
          stars_icon={
            <i class="fa-solid fa-star">
              <i class="fa-solid fa-star">
                <i class="fa-solid fa-star">
                  <i class="fa-solid fa-star">
                    <i class="fa-solid fa-star"></i>
                  </i>
                </i>
              </i>
            </i>
          }
          review_desc={
            "ShoeSnap exceeded my expectations with their wide range of footwear options!"
          }
          avatar_link={"https://xsgames.co/randomusers/avatar.php?g=female"}
        />
        <Review_Card
          stars_icon={
            <i class="fa-solid fa-star">
              <i class="fa-solid fa-star">
                <i class="fa-solid fa-star">
                  <i class="fa-solid fa-star">
                    <i class="fa-solid fa-star"></i>
                  </i>
                </i>
              </i>
            </i>
          }
          review_desc={
            "Best Sneaker collection and quality is also top-notch!"
          }
          avatar_link={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
        />
      </div>
    </div>
  );
}

export default ClientReviews;
