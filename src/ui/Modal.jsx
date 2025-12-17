import { useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FiX } from 'react-icons/fi';

/**
 * Modern, accessible Modal with:
 * - Portal rendering to `document.body`
 * - Overlay click + Escape to close
 * - Focus trap and restore on close
 * - Smooth enter/exit transitions
 * - Header/Body/Footer slots via props
 * - Size variants with sensible defaults
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'xl', // sm, md, lg, xl, full
  align = 'center', // 'center' | 'top'
  closable = true,
  showOverlay = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  preventClose = false,
  className,
  panelClassName,
  overlayClassName,
  initialFocusRef,
  maxWidth, // optional legacy override
}) {
  if (!isOpen) return null;

  const titleId = useId();
  const descId = useId();
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const prevFocusRef = useRef(null);

  // Size map (Tailwind v4)
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90rem]',
  };
  const resolvedMax = maxWidth ? maxWidth : sizes[size] ?? sizes.xl;

  useEffect(() => {
    // Enter transition
    const t = setTimeout(() => setVisible(true), 10);

    // Save and trap focus
    prevFocusRef.current = document.activeElement;
    const getFocusables = () =>
      panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    const first = initialFocusRef?.current ?? getFocusables()?.[0];
    if (first && typeof first.focus === 'function') first.focus();

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && closeOnEsc && !preventClose) {
        onClose?.();
      }
      if (e.key === 'Tab') {
        const focusables = getFocusables();
        if (!focusables || focusables.length === 0) return;
        const elements = Array.from(focusables);
        const currentIndex = elements.indexOf(document.activeElement);
        if (e.shiftKey) {
          const prevIndex = currentIndex <= 0 ? elements.length - 1 : currentIndex - 1;
          elements[prevIndex]?.focus?.();
          e.preventDefault();
        } else {
          const nextIndex = currentIndex >= elements.length - 1 ? 0 : currentIndex + 1;
          elements[nextIndex]?.focus?.();
          e.preventDefault();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      // Restore previous focus
      const prev = prevFocusRef.current;
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [onClose, closeOnEsc, preventClose, initialFocusRef]);

  const handleOverlayClick = (e) => {
    if (!closeOnOverlayClick || preventClose) return;
    if (e.target === e.currentTarget) onClose?.();
  };

  const content = (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex ${
        align === 'top' ? 'items-start' : 'items-center'
      } justify-center px-4 py-8 ${showOverlay ? 'bg-slate-900/45' : ''} transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${overlayClassName ?? ''}`}
      role='dialog'
      aria-modal='true'
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        className={`relative w-full ${resolvedMax} ${
          align === 'top' ? 'mt-16' : ''
        } bg-white/95 backdrop-blur supports-backdrop-filter:backdrop-blur-sm ring-1 ring-slate-200/70 rounded-2xl shadow-xl transition-all duration-200 ${
          visible ? 'opacity-100 translate-y-0 scale-[0.998]' : 'opacity-0 translate-y-3 scale-[0.99]'
        } ${panelClassName ?? ''}`}
      >
        {(title || closable) && (
          <div className='sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 rounded-t-2xl'>
            <div className='min-w-0'>
              {title ? (
                <h3 id={titleId} className='text-base font-semibold text-slate-900 truncate'>
                  {title}
                </h3>
              ) : null}
              {description ? (
                <p id={descId} className='mt-0.5 text-sm text-slate-600'>
                  {description}
                </p>
              ) : null}
            </div>
            {closable ? (
              <button
                type='button'
                onClick={() => {
                  if (preventClose) return;
                  onClose?.();
                }}
                className='inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors'
                aria-label='Close modal'
              >
                <FiX className='h-5 w-5' />
              </button>
            ) : null}
          </div>
        )}

        <div className={`p-6 max-h-[85vh] overflow-y-auto ${className ?? ''}`}>{children}</div>

        {footer ? (
          <div className='sticky bottom-0 z-10 px-6 py-4 bg-slate-50/95 backdrop-blur-sm border-t border-slate-200/80 rounded-b-2xl'>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}
