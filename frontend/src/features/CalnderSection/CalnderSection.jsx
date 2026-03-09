import styles from "./CalnderSection.module.scss";

// components
import Clcok from "../../components/Clcok/Clcok";

const CalnderSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Clcok />
      </div>
    </div>
  );
};

export default CalnderSection;
