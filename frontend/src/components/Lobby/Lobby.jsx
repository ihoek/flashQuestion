import styles from "./Lobby.module.scss";

//features
import CustomButton from "../../features/Custom/CustomButton/CustomButton";

const Lobby = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.title}>
          <span>예랑가랑</span>
          <span>졸업을 도와줘!</span>
        </div>
        {/* <CustomButton text="시작하기" type="primary" onClick={() => {}} /> */}
      </div>
    </div>
  );
};

export default Lobby;
