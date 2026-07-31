import './CarouselChevron.css';

const ChevronIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CarouselChevron = ({
  direction,
  onClick,
  hidden = false,
  size = 'outer',
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      className={`carouselChevron carouselChevron${size === 'inner' ? 'Inner' : 'Outer'} carouselChevron${direction === 'right' ? 'Right' : 'Left'} ${hidden ? 'carouselChevronHidden' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={hidden ? -1 : 0}
    >
      {direction === 'right' ? (
        <svg
          width={size === 'inner' ? '20' : '24'}
          height={size === 'inner' ? '20' : '24'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      ) : (
        <ChevronIcon />
      )}
    </button>
  );
};

export default CarouselChevron;
