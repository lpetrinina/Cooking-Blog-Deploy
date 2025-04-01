import styles from "./About.module.css";

export default function About() {
  return (
    <>
      <div className="flex flex-col justify-center bg-white py-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <div className="bg-gradient-to-r from-white to-pink-100 px-4 py-8 text-gray-700 shadow-lg sm:rounded-lg sm:px-10">
            <h1 className={styles["primary-header"]}>About us</h1>
            <div className={styles["wrapper"]}>
              <div className={styles["text-container"]}>
                <h3>Welcome to Healthy Sweet Life Blog!</h3>
                <p>
                  We believe that desserts should be both delicious and
                  nourishing. Our mission is to redefine indulgence by creating
                  sweet treats that are made with wholesome, natural
                  ingredients—without compromising on taste!
                </p>
                <p>
                  Whether you're looking for refined sugar-free, gluten-free,
                  vegan, or high-protein desserts, we’ve got something for
                  everyone. Our recipes are crafted with health-conscious
                  foodies in mind, proving that you don’t have to give up sweets
                  to maintain a balanced lifestyle. Join us on this journey of
                  guilt-free indulgence as we explore creative, satisfying, and
                  nutrient-packed desserts.
                </p>
                <p>Let’s make healthy eating a little sweeter!</p>
              </div>
              <div className={styles["image-container"]}>
                <img
                  src="./images/brooke-lark-V4MBq8kue3U-unsplash.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
