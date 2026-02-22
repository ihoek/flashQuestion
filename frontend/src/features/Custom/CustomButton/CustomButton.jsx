import styles from "./CustomButton.module.scss";

/*
@param {string} text - 버튼 텍스트
@param {string} type - 버튼 종류
@param {string} onClick - 버튼 클릭 이벤트
*/

const CustomButton = ({ text, type, onClick }) => {
  return (
    <div
      className={`${styles.container} ${type ? styles[type] : ""}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default CustomButton;
