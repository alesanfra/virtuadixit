import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  count: Signal<number>;
}

async function changeCount(
  currentValue: number,
  difference: number,
): Promise<number> {
  const newValue = currentValue + difference;
  const response = await fetch(`/api/count?new_count=${newValue}`, {
    method: "POST",
  });
  return (response.ok) ? newValue : currentValue;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-8 py-6">
      <Button
        onClick={async () =>
          props.count.value = await changeCount(props.count.value, -1)}
      >
        -1
      </Button>
      <p class="text-3xl">{props.count}</p>
      <Button
        onClick={async () =>
          props.count.value = await changeCount(props.count.value, 1)}
      >
        +1
      </Button>
    </div>
  );
}
