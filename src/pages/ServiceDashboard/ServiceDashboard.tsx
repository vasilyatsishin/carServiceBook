import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ServiceDashboard.module.css";
import { getAllCars } from "../../services/carService";
import type { CarReceivingObject } from "../../interfaces/Cars/CarInterface";
import { useToast } from "../../shared/providers/ToastProvider";
import { formatOdometer } from "../../shared/helpers/formatters/carFormatter";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { pathConstants } from "../../constants/pathConstants";

const ServiceDashboard: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarReceivingObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCars()
      .then(setCars)
      .catch(() => toast("Помилка завантаження автомобілів", "error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 24 }}>Завантаження...</p>;

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 className={styles.title} style={{ margin: 0 }}>Всі автомобілі</h1>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "var(--yellow-color, #ffcc00)", color: "#222",
            fontWeight: 700, border: "none", borderRadius: 10,
            padding: "10px 20px", cursor: "pointer", fontSize: "0.95rem"
          }}
          onClick={() => navigate(pathConstants.SERVICE_ADD_CAR)}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Додати авто
        </button>
      </div>

      {cars.length === 0 ? (
        <p className={styles.empty}>Автомобілів не знайдено</p>
      ) : (
        <div className={styles.grid}>
          {cars.map((car) => (
            <div
              key={car.id}
              className={styles.card}
              onClick={() =>
                navigate(`${pathConstants.SERVICE_MAINTENANCE}/${car.id}`)
              }
            >
              <img
                className={styles.cardPhoto}
                src={car.photoUrl}
                alt={car.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className={styles.cardBody}>
                <p className={styles.carName}>{car.name}</p>
                {car.ownerName && (
                  <span className={styles.ownerBadge}>
                    <PersonIcon sx={{ fontSize: 14 }} />
                    {car.ownerName}
                  </span>
                )}
                <p className={styles.odometer}>
                  Пробіг: {formatOdometer(car.odometer.toString())} км
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceDashboard;
