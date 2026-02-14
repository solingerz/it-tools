import QRCode, { type QRCodeErrorCorrectionLevel, type QRCodeToDataURLOptions } from 'qrcode';
import { type MaybeRef, ref, toValue, watch } from 'vue';

export function useQRCode({
  text,
  color: { background, foreground },
  errorCorrectionLevel,
  options,
}: {
  text: MaybeRef<string>
  color: { foreground: MaybeRef<string>; background: MaybeRef<string> }
  errorCorrectionLevel?: MaybeRef<QRCodeErrorCorrectionLevel>
  options?: QRCodeToDataURLOptions
}) {
  const qrcode = ref('');

  watch(
    () => ({
      text: toValue(text),
      background: toValue(background),
      foreground: toValue(foreground),
      errorCorrectionLevel: toValue(errorCorrectionLevel),
    }),
    async ({ text: currentText, background: currentBackground, foreground: currentForeground, errorCorrectionLevel: currentErrorCorrectionLevel }) => {
      if (currentText) {
        qrcode.value = await QRCode.toDataURL(currentText.trim(), {
          color: {
            dark: currentForeground,
            light: currentBackground,
            ...options?.color,
          },
          errorCorrectionLevel: (currentErrorCorrectionLevel ?? 'M') as QRCodeErrorCorrectionLevel,
          ...options,
        });
      }
    },
    { immediate: true },
  );

  return { qrcode };
}
