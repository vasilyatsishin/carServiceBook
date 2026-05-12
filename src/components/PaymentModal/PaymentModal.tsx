import type React from "react";
import { useState } from "react";
import styles from "./PaymentModal.module.css";
import { payMaintenance } from "../../services/maintenanceService";
import { useToast } from "../../shared/providers/ToastProvider";

interface PaymentModalProps {
  maintenanceId: number;
  carId: number;
  price: number;
  onClose: () => void;
  onSuccess: () => void;
}

const formatCardNumber = (val: string) =>
  val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (val: string) => {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  maintenanceId,
  carId,
  price,
  onClose,
  onSuccess,
}) => {
  const toast = useToast();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (cardNumber.replace(/\s/g, "").length < 16) return "Введіть повний номер картки";
    if (expiry.length < 5) return "Введіть термін дії";
    if (cvv.length < 3) return "Введіть CVV";
    if (cardHolder.trim().length < 3) return "Введіть ім'я власника";
    return "";
  };

  const handlePay = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    try {
      await payMaintenance(maintenanceId, carId);
      toast("Оплату успішно здійснено");
      onSuccess();
      onClose();
    } catch {
      toast("Помилка оплати. Спробуйте ще раз", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Оплата послуги</h2>
        <p className={styles.amount}>{price.toFixed(2)} грн.</p>

        <div className={styles.field}>
          <label>Номер картки</label>
          <input
            className={styles.input}
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
          />
        </div>

        <div className={styles.field}>
          <label>Ім'я власника</label>
          <input
            className={styles.input}
            placeholder="IVAN PETRENKO"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Термін дії</label>
            <input
              className={styles.input}
              placeholder="MM/RR"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
            />
          </div>
          <div className={styles.field}>
            <label>CVV</label>
            <input
              className={styles.input}
              placeholder="•••"
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              maxLength={3}
            />
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose} disabled={loading}>
            Скасувати
          </button>
          <button className={styles.payBtn} onClick={handlePay} disabled={loading}>
            {loading ? "Обробка..." : "Оплатити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
