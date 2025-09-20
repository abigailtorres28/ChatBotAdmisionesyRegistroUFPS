// src/components/ConnectionIndicator/ConnectionIndicator.tsx
import styles from "./ConnectionIndicator.module.css";

type Props = {
  connected: boolean;
};

const ConnectionIndicator: React.FC<Props> = ({ connected }) => {
  return (
    <div className={styles.status}>
      <span
        className={`${styles.dot} ${
          connected ? styles.connected : styles.disconnected
        }`}
      />
      {connected ? "Conectado" : "Sin conexión"}
    </div>
  );
};

export default ConnectionIndicator;
