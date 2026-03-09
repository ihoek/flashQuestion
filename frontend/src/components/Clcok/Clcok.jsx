import { useEffect, useState } from "react";
import styles from "./Clcok.module.scss";

const Clcok = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 시계 바늘 각도 계산
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const minDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* 시계 본체 */}
        <div className={styles.clockBody}>
          <div className={styles.innerFace}>
            {/* 12개의 시간 표시 틱 */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={styles.tick}
                style={{ transform: `rotate(${i * 30}deg)` }}
              >
                <div className={styles.tickMark}></div>
              </div>
            ))}

            {/* 시계 바늘 */}
            <div
              className={`${styles.hand} ${styles.hour}`}
              style={{ transform: `rotate(${hourDegrees}deg)` }}
            ></div>
            <div
              className={`${styles.hand} ${styles.minute}`}
              style={{ transform: `rotate(${minDegrees}deg)` }}
            ></div>
            <div className={styles.centerDot}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clcok;
