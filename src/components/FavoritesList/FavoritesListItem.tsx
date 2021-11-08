import { HomeResources } from '../../resources/home';
import { Pokemon } from '../../models/pokemon';
import { Button, Card, Col, Collapse, Divider, List, Row, Tooltip, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FC, memo, useCallback } from 'react';

interface FavoritesListItemProps {
  pokemon: Pokemon;
  onDelete: (pokemonId: number) => void;
}

const { tooltipDeleteFromFavorites, btnMorePokemons } = HomeResources;
const { Panel } = Collapse;

const FavoritesListItem: FC<FavoritesListItemProps> = memo(({ pokemon, onDelete }) => {
  const handleDeleteFromFavorites = useCallback(() => {
    onDelete(pokemon.id);
  }, [pokemon, onDelete]);

  return (
    <List.Item>
      <Card size='small'>
        <Row gutter={16} align='middle' justify='space-between'>
          <Col>
            <Typography.Text strong>
              {pokemon.id}. {pokemon.name}
            </Typography.Text>
          </Col>
          <Col>
            <Tooltip title={tooltipDeleteFromFavorites}>
              <Button onClick={handleDeleteFromFavorites}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Col>
          <Divider />
          {pokemon.items && pokemon.items.length > 0 && (
            <Collapse>
              <Panel key={pokemon.id} header={btnMorePokemons}>
                {pokemon.items.map((pokemonItem, index) => (
                  <div key={pokemonItem.id}>
                    <Typography.Text>
                      {index + 1}. {pokemonItem.name}
                    </Typography.Text>
                  </div>
                ))}
              </Panel>
            </Collapse>
          )}
        </Row>
      </Card>
    </List.Item>
  );
});

FavoritesListItem.displayName = 'FavoritesListItem';
export { FavoritesListItem };
