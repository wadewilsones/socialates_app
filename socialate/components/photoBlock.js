import styles from "../styles/Profile.module.css"

const PhotoBlock = () => {
    return(
    <section  className={styles.Photos}>
        <h3>Photos <span>12</span></h3>
        <div>
            <img src='https://cdn.pixabay.com/photo/2022/10/01/22/38/sugarloaf-rock-7492389_960_720.jpg'></img>
            <img src='https://cdn.pixabay.com/photo/2022/10/09/04/28/deer-7508187_960_720.jpg'></img>
            <img src='https://cdn.pixabay.com/photo/2022/09/15/09/59/water-7456116_960_720.jpg'></img>
        </div>
    </section>
    )

}


export default PhotoBlock;