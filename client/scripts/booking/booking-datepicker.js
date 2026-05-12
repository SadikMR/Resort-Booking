/**
 * Stay dates modal (Hotel Datepicker) + sidebar totals from nightly rate.
 * Dependencies: ./fecha.js, ./hotel-datepicker.js (local imports)
 * Styles: css/hotel-datepicker.css (+ css/styles.css)
 */
import * as fecha from './fecha.js';
import HotelDatepicker from './hotel-datepicker.js';

const STAY_DATE_SEPARATOR = ' - ';

function formatTodayISO() {
  return fecha.format(new Date(), 'YYYY-MM-DD');
}

function splitStayRangeString(rangeValue) {
  if (!rangeValue || typeof rangeValue !== 'string') {
    return { checkIn: null, checkOut: null };
  }
  const splitAt = rangeValue.indexOf(STAY_DATE_SEPARATOR);
  if (splitAt === -1) {
    return { checkIn: null, checkOut: null };
  }
  return {
    checkIn: rangeValue.slice(0, splitAt).trim(),
    checkOut: rangeValue.slice(splitAt + STAY_DATE_SEPARATOR.length).trim(),
  };
}

/** Number of overnight stays between check-in and checkout (exclusive of checkout calendar day departure). */
function countNightsBetween(checkInISO, checkOutISO) {
  const start = fecha.parse(checkInISO, 'YYYY-MM-DD');
  const end = fecha.parse(checkOutISO, 'YYYY-MM-DD');
  if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const nights = Math.round((end.getTime() - start.getTime()) / 86400000);
  return nights > 0 ? nights : 0;
}

function formatUSDWhole(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatStayDateShort(isoCalendarDate) {
  if (!isoCalendarDate) return '';
  const date = fecha.parse(isoCalendarDate, 'YYYY-MM-DD');
  if (!date || Number.isNaN(date.getTime())) return '';
  return fecha.format(date, 'MMM D');
}

function initBookingStayDates() {
  const stayDatesInput = document.getElementById('booking-stay-dates-input');
  const bookingSection = stayDatesInput?.closest('[data-booking-nightly-price-usd]');
  const nightlyRateUsd =
    bookingSection != null ? Number(bookingSection.dataset.bookingNightlyPriceUsd || 2026) : 600;
  const nightlyPriceEl = document.getElementById('booking-nightly-price-value');
  const totalPriceEl = document.getElementById('booking-total-price-value');
  const nightsDetailEl = document.getElementById('booking-night-count-detail');
  const modalRoot = document.getElementById('booking-stay-dates-modal');
  const modalPanel = document.getElementById('booking-stay-dates-modal-panel');
  const modalBackdrop = modalRoot?.querySelector('.booking-stay-dates-modal-backdrop');
  const modalDismiss = modalRoot?.querySelector('.booking-stay-dates-modal-dismiss');
  const openCheckInButton = document.querySelector('[data-booking-calendar-trigger="check-in"]');
  const openCheckOutButton = document.querySelector('[data-booking-calendar-trigger="check-out"]');
  const checkInSummary = document.getElementById('booking-check-in-summary');
  const checkOutSummary = document.getElementById('booking-check-out-summary');
  const dateTriggers = [openCheckInButton, openCheckOutButton].filter(Boolean);

  if (!stayDatesInput || !modalRoot || !modalPanel || Number.isNaN(nightlyRateUsd) || nightlyRateUsd < 0) {
    return;
  }

  if (nightlyPriceEl) nightlyPriceEl.textContent = formatUSDWhole(nightlyRateUsd);

  const updateCheckInCheckOutSummaries = () => {
    const { checkIn, checkOut } = splitStayRangeString(stayDatesInput.value);
    if (checkInSummary) {
      checkInSummary.textContent = formatStayDateShort(checkIn) || 'Select';
    }
    if (checkOutSummary) {
      checkOutSummary.textContent = formatStayDateShort(checkOut) || 'Select';
    }
  };

  const updateStayPricing = () => {
    const { checkIn, checkOut } = splitStayRangeString(stayDatesInput.value);
    const nights = checkIn && checkOut ? countNightsBetween(checkIn, checkOut) : 0;
    if (nightsDetailEl) {
      nightsDetailEl.textContent = nights > 0 ? `(${nights} night${nights === 1 ? '' : 's'})` : '';
    }
    if (totalPriceEl) {
      totalPriceEl.textContent =
        nights > 0 ? formatUSDWhole(nightlyRateUsd * nights) : '—';
    }
  };

  /** Trigger that opened the modal (for returning focus on close). */
  let stayDatesModalTrigger = null;

  const setDateTriggersExpanded = (isExpanded) => {
    for (const trigger of dateTriggers) {
      trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }
  };

  const showStayDatesModal = () => {
    modalRoot.removeAttribute('hidden');
    modalRoot.removeAttribute('aria-hidden');
    document.body.classList.add('booking-stay-dates-modal-open');
    setDateTriggersExpanded(true);
  };

  const hideStayDatesModal = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && modalRoot.contains(active)) {
      active.blur();
    }
    if (
      stayDatesModalTrigger instanceof HTMLElement &&
      typeof stayDatesModalTrigger.focus === 'function'
    ) {
      stayDatesModalTrigger.focus({ preventScroll: true });
    }
    modalRoot.setAttribute('hidden', '');
    modalRoot.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-stay-dates-modal-open');
    setDateTriggersExpanded(false);
  };

  const stayDatesPicker = new HotelDatepicker(stayDatesInput, {
    inline: false,
    clearButton: true,
    submitButton: true,
    topbarCloseButton: false,
    topbarPosition: 'bottom',
    submitButtonName: 'apply_stay_dates',
    container: modalPanel,
    startDate: formatTodayISO(),
    minNights: 1,
    selectForward: true,
    format: 'YYYY-MM-DD',
    separator: STAY_DATE_SEPARATOR,
    autoClose: false,
    preventContainerClose: true,
    i18n: {
      submitButton: 'Submit',
    },
    setValue(value) {
      stayDatesInput.value = value;
      updateCheckInCheckOutSummaries();
      updateStayPricing();
    },
  });

  stayDatesInput.addEventListener('input', () => {
    updateCheckInCheckOutSummaries();
    updateStayPricing();
  });
  stayDatesInput.addEventListener('change', () => {
    updateCheckInCheckOutSummaries();
    updateStayPricing();
  });
  stayDatesInput.addEventListener(
    'afterClear',
    () => {
      if (checkInSummary) checkInSummary.textContent = 'Select';
      if (checkOutSummary) checkOutSummary.textContent = 'Select';
      updateStayPricing();
    },
    false
  );

  stayDatesInput.addEventListener(
    'afterClose',
    () => {
      hideStayDatesModal();
    },
    false
  );

  const openCalendarModal = (event) => {
    event.stopPropagation();
    stayDatesModalTrigger = event.currentTarget;
    showStayDatesModal();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        stayDatesPicker.open();
        const pickerEl = stayDatesPicker.getDatePicker();
        if (pickerEl && typeof pickerEl.focus === 'function') {
          pickerEl.focus({ preventScroll: true });
        }
      });
    });
  };

  for (const trigger of dateTriggers) {
    trigger.addEventListener('click', openCalendarModal);
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openCalendarModal(event);
    });
  }

  const applyButton = document.getElementById(`submit-${stayDatesInput.id}`);
  if (applyButton) {
    applyButton.addEventListener('click', (event) => {
      event.preventDefault();
      stayDatesPicker.close();
    });
  }

  if (modalDismiss) {
    modalDismiss.addEventListener('click', () => {
      stayDatesPicker.close();
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', () => {
      stayDatesPicker.close();
    });
  }

  updateCheckInCheckOutSummaries();
  updateStayPricing();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBookingStayDates);
} else {
  initBookingStayDates();
}
