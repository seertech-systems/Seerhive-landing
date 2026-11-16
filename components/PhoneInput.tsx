"use client";

import PhoneNumberInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const PHONE_DIGITS = 10;

/** Digits after the country code, from an international value such as "+919876543210". */
export const nationalDigits = (value: string) => parsePhoneNumber(value)?.nationalNumber ?? "";

/**
 * Phone field built on react-phone-number-input: country flag + code dropdown, and the number box
 * only accepts digits. A number longer than PHONE_DIGITS digits is refused as it is typed or pasted.
 * `value` is the international form ("+919876543210"), or "" when empty, and is also submitted
 * with the form under `name`.
 */
export default function PhoneInput({
  name,
  value,
  onChange,
  invalid,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  return (
    <div className={`seer-phone mt-2 ${invalid ? "seer-phone-invalid" : ""}`}>
      <input type="hidden" name={name} value={value} />
      <PhoneNumberInput
        international
        defaultCountry="IN"
        countryCallingCodeEditable={false}
        placeholder="9876543210"
        limitMaxLength
        numberInputProps={{
          inputMode: "numeric",
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            // Once 10 digits are in, a further digit is blocked unless the user is replacing a selection.
            const el = e.currentTarget;
            const hasSelection = el.selectionStart !== el.selectionEnd;
            if (/^\d$/.test(e.key) && !hasSelection && nationalDigits(value).length >= PHONE_DIGITS) e.preventDefault();
          },
        }}
        value={value || undefined}
        onChange={(v) => {
          const next = v ?? "";
          if (nationalDigits(next).length > PHONE_DIGITS) return;
          onChange(next);
        }}
      />
    </div>
  );
}
