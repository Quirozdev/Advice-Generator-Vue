import { request } from "@/services/request";
import {
  ref,
  toValue,
  watchEffect,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

export default function useRequest<T>(url: MaybeRefOrGetter<string>) {
  const controller = new AbortController();

  const data: Ref<T | null> = ref(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const refetch = () => {
    data.value = null;
    error.value = null;
    loading.value = true;
    request<T>(toValue(url), {
      signal: controller.signal,
      cache: "no-cache",
    })
      .then((responseData) => (data.value = responseData))
      .catch((err) => {
        if (err instanceof Error) {
          error.value = err;
        } else {
          error.value = new Error("Something went wrong :(");
        }
      })
      .finally(() => (loading.value = false));
  };

  watchEffect((onCleanup) => {
    refetch();

    onCleanup(() => {
      controller.abort();
    });
  });

  return { data, error, loading, refetch };
}
