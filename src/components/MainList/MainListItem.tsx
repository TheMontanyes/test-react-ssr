import { HomeResources } from '../../resources/home';
import { Pokemon } from '../../models/pokemon';
import { Button, Card, Col, Collapse, Divider, List, Row, Tooltip, Typography } from 'antd';
import { DeleteOutlined, StarOutlined } from '@ant-design/icons';
import { FC, memo, useCallback } from 'react';

interface MainListItemProps {
  pokemon: Pokemon;
  onMoveToFavorite: (pokemonId: number) => void;
}

const { tooltipAddToFavorites, btnMorePokemons } = HomeResources;
const { Panel } = Collapse;

const MainListItem: FC<MainListItemProps> = memo(({ pokemon, onMoveToFavorite }) => {
  const handleMoveToFavorites = useCallback(() => {
    onMoveToFavorite(pokemon.id);
  }, [pokemon, onMoveToFavorite]);

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
            <Tooltip title={tooltipAddToFavorites}>
              <Button onClick={handleMoveToFavorites}>
                <StarOutlined />
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

MainListItem.displayName = 'FavoritesListItem';
export { MainListItem };
