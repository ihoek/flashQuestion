import styles from "./CalnderSection.module.scss";

// components
import Clcok from "../../components/Clcok/Clcok";

const CalnderSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Clcok />

        <div className={styles.dDaySection}>
          <div className={styles.dDayTitle}>D-DAY</div>
        </div>
      </div>
    </div>
  );
};

export default CalnderSection;
