import type React from "react";
import { useEffect, useState } from "react";
import styles from "./Operator.module.css";
import AddIcon from "@mui/icons-material/Add";
import {
  getCatalog,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from "../../services/catalogService";
import type { CatalogItem, CatalogItemCreate } from "../../interfaces/Catalog/CatalogInterface";
import { useToast } from "../../shared/providers/ToastProvider";

const emptyForm: CatalogItemCreate = { name: "", description: "", price: 0 };

const Operator: React.FC = () => {
  const toast = useToast();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CatalogItem | null>(null);
  const [form, setForm] = useState<CatalogItemCreate>(emptyForm);
  const [priceInput, setPriceInput] = useState<string>("0");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setItems(await getCatalog());
    } catch {
      toast("Помилка завантаження каталогу", "error");
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setPriceInput("0");
    setShowForm(true);
  };

  const openEdit = (item: CatalogItem) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description, price: item.price });
    setPriceInput(item.price.toString());
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCatalogItem(id);
      toast("Послугу видалено");
      load();
    } catch {
      toast("Помилка видалення", "error");
    }
  };

  const handleSave = async () => {
    const parsedPrice = parseFloat(priceInput);
    if (!form.name.trim()) { toast("Введіть назву послуги", "error"); return; }
    if (isNaN(parsedPrice) || parsedPrice < 0) { toast("Введіть коректну ціну", "error"); return; }
    const finalForm = { ...form, price: parsedPrice };
    setLoading(true);
    try {
      if (editing) {
        await updateCatalogItem(editing.id, finalForm);
        toast("Послугу оновлено");
      } else {
        await createCatalogItem(finalForm);
        toast("Послугу додано");
      }
      setShowForm(false);
      load();
    } catch {
      toast("Помилка збереження", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Каталог послуг</h1>
        <button className={styles.addBtn} onClick={openCreate}>
          <AddIcon sx={{ fontSize: 20 }} />
          Додати послугу
        </button>
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>Каталог порожній</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Назва</th>
              <th>Опис</th>
              <th>Ціна</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.name}</strong></td>
                <td>{item.description || "—"}</td>
                <td className={styles.price}>{item.price.toFixed(2)} грн.</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openEdit(item)}>
                      Редагувати
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                      Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className={styles.overlay} onClick={() => setShowForm(false)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.formTitle}>
              {editing ? "Редагувати послугу" : "Нова послуга"}
            </h2>

            <div className={styles.formField}>
              <label>Назва</label>
              <input
                className={styles.formInput}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Назва послуги"
              />
            </div>

            <div className={styles.formField}>
              <label>Опис</label>
              <textarea
                className={styles.formTextarea}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Короткий опис (необов'язково)"
              />
            </div>

            <div className={styles.formField}>
              <label>Ціна (грн.)</label>
              <input
                className={styles.formInput}
                type="number"
                min={0}
                step={0.01}
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </div>

            <div className={styles.formActions}>
              <button className={styles.cancelFormBtn} onClick={() => setShowForm(false)}>
                Скасувати
              </button>
              <button className={styles.saveBtn} onClick={handleSave} disabled={loading}>
                {loading ? "Збереження..." : "Зберегти"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operator;
