import { SyntheticEvent, useState } from 'react';
import { SortingOptions } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSorting, sortOffers } from '../../store/actions';
import cn from 'classnames';

const indexedOptions = SortingOptions.map((option, index) => ({
  title: option,
  index,
}));

function OptionsForm(): JSX.Element {
  const [areOptionsActive, toggleOptions] = useState<boolean>(false);
  const selectedSorting = useAppSelector((state) => state.selectedSorting);
  const dispatch = useAppDispatch();

  const handleSortingChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLElement;
    dispatch(
      setSorting({
        targetSorting:
          target.innerHTML as unknown as typeof SortingOptions[number],
      })
    );
    dispatch(sortOffers());
    toggleOptions(!areOptionsActive);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => toggleOptions(!areOptionsActive)}
      >
        {selectedSorting}
        <ul
          className={cn('places__options', 'places__options--custom', {
            'places__options--opened': areOptionsActive,
          })}
        >
          {indexedOptions.map((option) => {
            const isActive = option.title === selectedSorting;
            return (
              <li
                className={cn('places__option', {'places__option--active': isActive})}
                tabIndex={0}
                key={option.index}
                onClick={(event) => handleSortingChange(event)}
              >
                {option.title}
              </li>
            );
          })}
        </ul>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
    </form>
  );
}

export default OptionsForm;
