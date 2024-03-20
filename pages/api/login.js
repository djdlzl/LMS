// 예시용 사용자 데이터
const users = [
  { email: "user@example.com", password: "password123" },
  // 관리자가 추가할 사용자 정보
];

export default function handler(req, res) {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "로그인 성공!" });
  } else {
    res
      .status(401)
      .json({ message: "로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다." });
  }
}
