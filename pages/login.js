import { useState } from "react";
import styles from "./login.module.css"; // CSS 모듈 사용
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    const result = await signIn("credentials", {
      redirect: false, // 기본 리디렉션 비활성화
      email,
      password,
      callbackUrl: `${window.location.origin}/board`,
    });

    if (result?.url) {
      // 사용자 정의 리디렉션 실행
      window.location.href = result.url;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/board`, // 로그인 성공 시 리디렉션할 URL 지정
    });
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
