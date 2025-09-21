import { useToast } from "vue-toastification";

const toast = useToast();

export function defaultSuccess(payload = {}) {
  const msg = !payload.msg ? "Operação realizada com sucesso!" : payload.msg;
  toast.success(msg);
}

export function defaultError(payload = {}) {
  const msg = !payload.msg ? "Ocorreu um erro!" : payload.msg;
  toast.error(msg);
}
