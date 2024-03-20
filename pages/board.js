import styles from "./Board.module.css"; // CSS 모듈을 사용하여 스타일 적용

// 예시 동영상 데이터
const videos = [
  {
    id: 1,
    title: "동영상 제목 1",
    description: "동영상 설명 1",
    thumbnail: "/path/to/thumbnail1.jpg",
  },
  {
    id: 2,
    title: "동영상 제목 2",
    description: "동영상 설명 2",
    thumbnail: "/path/to/thumbnail2.jpg",
  },
  // 추가 동영상 목록...
];

export default function Board() {
  return (
    <div className={styles.container}>
      <h2>강의 목록</h2>
      <div className={styles.videos}>
        {videos.map((video) => (
          <div key={video.id} className={styles.video}>
            <img
              src={video.thumbnail}
              alt={video.title}
              className={styles.thumbnail}
            />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
