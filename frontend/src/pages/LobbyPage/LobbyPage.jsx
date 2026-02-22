import styles from "./LobbyPage.module.scss";
import { useEffect, useRef } from "react";

// game
import { SceneController } from "../../game/core/SceneController";

const LobbyPage = () => {
  // 변수 선언
  const canvasRef = useRef(null);

  // ============== useEffect ==============
  useEffect(() => {
    if (canvasRef.current) {
      // 엔진 초기화
      const game = new SceneController(canvasRef.current);

      // 컴포넌트가 사라질 때 엔진도 종료 (메모리 누수 방지)
      return () => {
        game.dispose();
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          pointerEvents: "none",
        }}
      >
        <h1>My 3D Room</h1>
        <p>WASD로 이동, 마우스로 회전</p>
      </div>
    </div>
  );
};

export default LobbyPage;
