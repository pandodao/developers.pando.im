import { useToast as useUIKitToast } from "@foxone/uikit/lib/plugins/toast";

export function useToast() {
  const toast = useUIKitToast();

  const error = (error: any) => {
    console.log(error);
    const message = error?.message || error?.msg || error?.description || "Unknown Message";
    const code = error?.code ? `${error.code} ` : "";

    return toast.error({ message: `${code}${message}` });
  };

  return {
    error,
    success: toast.success,
    warning: toast.warning,
  };
}
