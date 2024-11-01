import React from "react";
import "../../style/content/login.scss";
import { InfoBigIcon } from "../../assets";
import { Header, Button, TutorialButton } from "../../components";
import { useLogin } from "../../hooks/useLogin";
import { BUTTON_ENUM } from "../../types/global.types";
function Login() {
  const { handleLogin } = useLogin();
  return (
    <section className="login">
      <div className="login__content">
        <InfoBigIcon />
        <Header>Log In with your Microsoft Account </Header>
        <p className="login__text">
          Check your credentials or ask your system administrator.
        </p>
        <Button type={BUTTON_ENUM.GOLD} text="Log in" onClick={handleLogin} />
        <TutorialButton />
      </div>
    </section>
  );
}

export default Login;
