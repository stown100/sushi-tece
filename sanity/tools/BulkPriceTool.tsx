import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Spinner,
  Stack,
  Text,
  TextInput,
  useToast,
} from "@sanity/ui";
import { SearchIcon } from "@sanity/icons";
import { useClient } from "sanity";

type Product = {
  _id: string;
  name: string | null;
  subcategory: string | null;
  price: number | null;
};

const QUERY = `*[_type == "product" && !(_id in path("drafts.**"))]{
  _id,
  "name": coalesce(name.ru, name.en, slug),
  subcategory,
  price
} | order(subcategory asc, name asc)`;

export default function BulkPriceTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [percent, setPercent] = useState("15");
  const [roundTo10, setRoundTo10] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await client.fetch<Product[]>(QUERY);
      setProducts(data);
      setDrafts(
        Object.fromEntries(
          data.map((p) => [p._id, p.price == null ? "" : String(p.price)])
        )
      );
    } catch (err) {
      toast.push({
        status: "error",
        title: "Не удалось загрузить товары",
        description: String((err as Error).message),
      });
    } finally {
      setLoading(false);
    }
  }, [client, toast]);

  useEffect(() => {
    load();
  }, [load]);

  // Товары с изменившейся и корректной ценой (id + новое значение).
  const changes = useMemo(() => {
    const result: { id: string; to: number }[] = [];
    for (const p of products) {
      const raw = (drafts[p._id] ?? "").trim().replace(",", ".");
      if (raw === "") continue;
      const next = Number(raw);
      if (!Number.isFinite(next) || next < 0) continue;
      if (next !== p.price) {
        result.push({ id: p._id, to: next });
      }
    }
    return result;
  }, [products, drafts]);

  const invalidIds = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      const raw = (drafts[p._id] ?? "").trim().replace(",", ".");
      if (raw === "") continue;
      const next = Number(raw);
      if (!Number.isFinite(next) || next < 0) set.add(p._id);
    }
    return set;
  }, [products, drafts]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        (p.name ?? "").toLowerCase().includes(q) ||
        (p.subcategory ?? "").toLowerCase().includes(q)
    );
  }, [products, search]);

  const toggle = useCallback((id: string) => {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allVisibleSelected =
    visible.length > 0 && visible.every((p) => selected.has(p._id));

  const toggleAllVisible = useCallback(() => {
    setSelected((s) => {
      const next = new Set(s);
      const everySelected =
        visible.length > 0 && visible.every((p) => next.has(p._id));
      for (const p of visible) {
        if (everySelected) next.delete(p._id);
        else next.add(p._id);
      }
      return next;
    });
  }, [visible]);

  const percentRaw = percent.trim().replace(",", ".");
  const percentValue = Number(percentRaw);
  const percentValid = percentRaw !== "" && Number.isFinite(percentValue);

  // Умножает цену выбранных товаров на (1 + percent/100), результат
  // подставляется в поля как ожидающее изменение — запись через «Сохранить».
  const applyPercent = useCallback(() => {
    if (!percentValid || !selected.size) return;
    const factor = 1 + percentValue / 100;
    setDrafts((d) => {
      const next = { ...d };
      for (const p of products) {
        if (!selected.has(p._id)) continue;
        const baseRaw = (d[p._id] ?? "").trim().replace(",", ".");
        const base = Number(baseRaw);
        if (baseRaw === "" || !Number.isFinite(base)) continue;
        const raised = base * factor;
        const result = roundTo10
          ? Math.round(raised / 10) * 10 // до ближайших 10 ₺: 437→440, 172.5→170
          : Math.round(raised * 100) / 100;
        next[p._id] = String(result);
      }
      return next;
    });
  }, [percentValid, percentValue, selected, products, roundTo10]);

  const save = useCallback(async () => {
    if (!changes.length) return;
    setSaving(true);
    try {
      let tx = client.transaction();
      for (const c of changes) {
        tx = tx.patch(c.id, (patch) => patch.set({ price: c.to }));
      }
      await tx.commit();
      // Обновляем оригиналы локально, чтобы изменения «зафиксировались».
      setProducts((prev) =>
        prev.map((p) => {
          const ch = changes.find((c) => c.id === p._id);
          return ch ? { ...p, price: ch.to } : p;
        })
      );
      toast.push({
        status: "success",
        title: `Обновлено цен: ${changes.length}`,
      });
    } catch (err) {
      toast.push({
        status: "error",
        title: "Ошибка при сохранении",
        description: String((err as Error).message),
      });
    } finally {
      setSaving(false);
    }
  }, [changes, client, toast]);

  if (loading) {
    return (
      <Flex align="center" justify="center" padding={5} style={{ height: "100%" }}>
        <Spinner muted />
        <Box marginLeft={3}>
          <Text muted>Загрузка товаров…</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" style={{ height: "100%" }}>
      {/* Шапка с поиском и кнопкой сохранения */}
      <Card padding={3} borderBottom tone="default" style={{ flex: "none" }}>
        <Flex align="center" gap={3}>
          <Box flex={1}>
            <TextInput
              icon={SearchIcon}
              placeholder="Поиск по названию или категории…"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </Box>
          <Badge tone={changes.length ? "caution" : "default"}>
            Изменений: {changes.length}
          </Badge>
          <Button
            text={saving ? "Сохранение…" : "Сохранить"}
            tone="positive"
            disabled={!changes.length || saving || invalidIds.size > 0}
            loading={saving}
            onClick={save}
          />
        </Flex>

        {/* Массовое действие: изменить цену выделенных на N%.
            На мобильных — в столбик, на планшете/десктопе (≥600px) — в ряд. */}
        <Flex
          direction={["column", "column", "row"]}
          align={["stretch", "stretch", "center"]}
          gap={3}
          marginTop={3}
        >
          {/* Группа выбора */}
          <Flex align="center" gap={3} wrap="wrap">
            <Flex
              align="center"
              gap={2}
              style={{ cursor: "pointer" }}
              onClick={toggleAllVisible}
            >
              <Checkbox checked={allVisibleSelected} readOnly />
              <Text size={1} muted>
                Выбрать все
              </Text>
            </Flex>
            <Badge tone={selected.size ? "primary" : "default"}>
              Выделено: {selected.size}
            </Badge>
          </Flex>

          <Box flex={1} display={["none", "none", "block"]} />

          {/* Группа изменения цены */}
          <Flex align="center" gap={3} wrap="wrap">
            <Flex
              align="center"
              gap={2}
              style={{ cursor: "pointer" }}
              onClick={() => setRoundTo10((v) => !v)}
            >
              <Checkbox checked={roundTo10} readOnly />
              <Text size={1} muted>
                Округлять до 10&nbsp;₺
              </Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Text size={1} muted>
                Изменить на
              </Text>
              <Box style={{ width: 90 }}>
                <TextInput
                  type="text"
                  inputMode="decimal"
                  value={percent}
                  suffix="%"
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    setPercent(value);
                  }}
                />
              </Box>
              <Button
                text="Применить"
                tone="primary"
                disabled={!selected.size || !percentValid}
                onClick={applyPercent}
              />
            </Flex>
          </Flex>
        </Flex>

        {invalidIds.size > 0 && (
          <Box marginTop={3}>
            <Text size={1} style={{ color: "var(--card-badge-critical-fg-color)" }}>
              Есть некорректные цены ({invalidIds.size}) — исправь, чтобы сохранить.
            </Text>
          </Box>
        )}
      </Card>

      {/* Таблица товаров */}
      <Box flex={1} overflow="auto" padding={3}>
        <Stack space={2}>
          {visible.map((p) => {
            const raw = (drafts[p._id] ?? "").trim().replace(",", ".");
            const num = Number(raw);
            const invalid = raw !== "" && (!Number.isFinite(num) || num < 0);
            const changed =
              raw !== "" && Number.isFinite(num) && num >= 0 && num !== p.price;
            return (
              <Card
                key={p._id}
                padding={3}
                radius={2}
                shadow={1}
                tone={invalid ? "critical" : changed ? "caution" : "default"}
              >
                <Flex align="center" gap={3}>
                  <Checkbox
                    checked={selected.has(p._id)}
                    onChange={() => toggle(p._id)}
                  />
                  <Box flex={1}>
                    <Stack space={2}>
                      <Text weight="medium">{p.name ?? p._id}</Text>
                      {p.subcategory && (
                        <Text size={1} muted>
                          {p.subcategory}
                        </Text>
                      )}
                    </Stack>
                  </Box>
                  <Box style={{ width: 140 }}>
                    <TextInput
                      type="text"
                      inputMode="decimal"
                      value={drafts[p._id] ?? ""}
                      suffix="₺"
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        setDrafts((d) => ({ ...d, [p._id]: value }));
                      }}
                    />
                  </Box>
                </Flex>
              </Card>
            );
          })}
          {!visible.length && (
            <Box padding={4}>
              <Text muted align="center">
                Ничего не найдено.
              </Text>
            </Box>
          )}
        </Stack>
      </Box>
    </Flex>
  );
}
