import { useState } from "react";
import styles from "./login.module.css"; // CSS 모듈 사용
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 로그인 처리 로직
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (response.ok) {
    //     // 로그인 성공 처리
    //     console.log("로그인 성공!");
    //   } else {
    //     // 로그인 실패 처리
    //     console.log("로그인 실패");
    //   }
    // };
    // signIn 함수 호출하여 로그인 시도
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
