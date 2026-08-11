import './CarouselChevron.css';

const chevronPaths = {
  left: '15 18 9 12 15 6',
  right: '9 18 15 12 9 6',
  up: '18 15 12 9 6 15',
  down: '6 9 12 15 18 9',
};

const CarouselChevron = ({
  direction,
  onClick,
  hidden = false,
  size = 'outer',
  ariaLabel,
}) => {
  const iconSize = size === 'inner' ? 20 : 24;
  const directionClass =
    direction === 'right'
      ? 'Right'
      : direction === 'up'
        ? 'Up'
        : direction === 'down'
          ? 'Down'
          : 'Left';

  return (
    <button
      type="button"
      className={`carouselChevron carouselChevron${size === 'inner' ? 'Inner' : 'Outer'} carouselChevron${directionClass} ${hidden ? 'carouselChevronHidden' : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={hidden ? -1 : 0}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points={chevronPaths[direction] || chevronPaths.left} />
      </svg>
    </button>
  );
};

export default CarouselChevron;
