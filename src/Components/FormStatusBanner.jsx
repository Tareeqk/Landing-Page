import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";

// Shared by ContactForm.jsx and PartnerForm.jsx -- both used to report
// success/failure via a browser alert(), which blocks the tab and looks
// out of place next to an otherwise custom-styled form. This renders
// inline instead; each consumer supplies its own dark-mode color
// overrides (`.form-status-banner--success/--error`) via its existing
// injected <style> block, same as every other color in these forms.
export default function FormStatusBanner({ status, onDismiss }) {
  if (!status) return null;

  const isSuccess = status.type === "success";

  return (
    <div
      role="status"
      className={`form-status-banner form-status-banner--${status.type} mb-4 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      {isSuccess ? (
        <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <p className="flex-1 leading-5">{status.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
}
