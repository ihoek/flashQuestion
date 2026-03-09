import styles from "./MiniPhone.module.scss";

const MiniPhone = () => {
  const menuItems = [
    { id: 1, icon: "📍", label: "Map", color: "#64B5F6" },
    { id: 2, icon: "🗺️", label: "World", color: "#81C784" },
    { id: 3, icon: "📋", label: "Task", color: "#4DB6AC" },
    { id: 4, icon: "👕", label: "Closet", color: "#FF8A65" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.phoneBody}>
        {/* 상단 스피커/센서 영역 */}
        <div className={styles.topNotch}></div>

        {/* 메뉴 그리드 */}
        <div className={styles.menuGrid}>
          {menuItems.map((item) => (
            <div key={item.id} className={styles.menuItem}>
              <div
                className={styles.iconBox}
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 포인트 정보 영역 */}
        <div className={styles.footer}>
          <div className={styles.pointBadge}>
            <span className={styles.cpLabel}>CP</span>
            <span className={styles.cpValue}>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPhone;
