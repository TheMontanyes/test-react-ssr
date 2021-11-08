import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import { ChangeEvent, FC, memo, useCallback, useContext, useState } from 'react';
import { HomeResources } from '../../resources/home';
import { useDebounce } from '../../hooks/useDebounce';
import { AppContext } from '../../store/AppContext';
import { setFilters } from '../../store/actions';

export enum SortDirectionsTypes {
  DESC = 'DESC',
  ASC = 'ASC',
}

interface FiltersProps {
  onSearch(value: string, sortType?: SortDirectionsTypes): void;
}

const { searchPlaceholder } = HomeResources;

const Filters: FC<FiltersProps> = memo(({ onSearch }) => {
  const {
    state: {
      mainListFilters: { searchValue, sortType },
    },
  } = useContext(AppContext);

  const [searchInput, setSearchInput] = useState<string>(searchValue ?? '');
  const [sortDirection, setSortDirection] = useState<SortDirectionsTypes>(
    sortType ?? SortDirectionsTypes.ASC,
  );

  const debounceSearch = useDebounce(onSearch, 500);

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim().toLowerCase();

      setSearchInput(value);
      debounceSearch(value, sortDirection);
    },
    [sortDirection],
  );

  const handleSwitchSort = useCallback(() => {
    const sortValue =
      sortDirection === SortDirectionsTypes.ASC
        ? SortDirectionsTypes.DESC
        : SortDirectionsTypes.ASC;

    setSortDirection(sortValue);
    onSearch(searchInput ?? '', sortValue);
  }, [searchInput, sortDirection]);

  return (
    <Row gutter={16}>
      <Col>
        <Input
          value={searchInput}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          suffix={<SearchOutlined />}
          allowClear
        />
      </Col>
      <Col>
        <Button onClick={handleSwitchSort}>
          {sortDirection === SortDirectionsTypes.ASC ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )}
        </Button>
      </Col>
    </Row>
  );
});

Filters.displayName = 'Filters';
export { Filters };
