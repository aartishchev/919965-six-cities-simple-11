import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSorting } from '../../store/offers-process/offers-process';
import { getSelectedSorting } from '../../store/offers-process/offers-process-selectors';
import { SortingOptions } from '../../const';
import cn from 'classnames';

const indexedOptions = SortingOptions.map((option, index) => ({
  title: option,
  index,
}));

function OptionsForm(): JSX.Element {
  const [areOptionsActive, toggleOptions] = useState<boolean>(false);
  const selectedSorting = useAppSelector(getSelectedSorting);
  const dispatch = useAppDispatch();

  const handleSortingChange = (option: typeof SortingOptions[number]) => {
    dispatch(setSorting({ targetSorting: option }));
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
                className={cn('places__option', {
                  'places__option--active': isActive,
                })}
                tabIndex={0}
                key={option.index}
                onClick={() => handleSortingChange(option.title)}
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

export default memo(OptionsForm);
