import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";
import img10 from "../assets/10.png";

export function Webtoon() {
  const images = [
    {
      src: img1,
      alt: "image1",
      title: "내일 뭐 입지?",
      link: "https://comic.naver.com/webtoon/list?titleId=823999",
    },
    {
      src: img2,
      alt: "image2",
      title: "외모지상주의",
      link: "https://comic.naver.com/webtoon/list?titleId=641253",
    },
    {
      src: img3,
      alt: "image3",
      title: "광마회귀",
      link: "https://comic.naver.com/webtoon/list?titleId=776601",
    },
    {
      src: img4,
      alt: "image4",
      title: "역대급 영지설계사",
      link: "https://comic.naver.com/webtoon/list?titleId=777767",
    },
    {
      src: img5,
      alt: "image5",
      title: "나 혼자 만렙 뉴비",
      link: "https://comic.naver.com/webtoon/list?titleId=773797",
    },
    {
      src: img6,
      alt: "image6",
      title: "유부 감자",
      link: "https://comic.naver.com/webtoon/list?titleId=822556",
    },
    {
      src: img7,
      alt: "image7",
      title: "상남자",
      link: "https://comic.naver.com/webtoon/list?titleId=751168",
    },
    {
      src: img8,
      alt: "image8",
      title: "재혼 황후",
      link: "https://comic.naver.com/webtoon/list?titleId=735661",
    },
    {
      src: img9,
      alt: "image9",
      title: "사자의 서",
      link: "https://comic.naver.com/webtoon/list?titleId=823737",
    },
    {
      src: img10,
      alt: "image10",
      title: "나 혼자 탑에서 농사",
      link: "https://comic.naver.com/webtoon/list?titleId=808389",
    },
  ];

  const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 8rem)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "30px",
    textAlign: "center",
  };
  const componentStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  };
  const imageStyles = { width: "120px", height: "auto" };
  const textStyles = { fontSize: "12px" };

  return (
    <div style={componentStyles}>
      <ul style={styles}>
        {images.map((image, index) => (
          <div style={{ textAlign: "center" }}>
            <a href={image.link}>
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                style={imageStyles}
              />
            </a>
            <div style={textStyles}>{image.title}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}
