import { useCallback, useContext, useState } from 'react';
import { AppContext } from '../store/AppContext';
import { Badge, Card, Col, Descriptions, Empty, Radio, RadioChangeEvent, Row, Space } from 'antd';
import { HistoryResources } from '../resources/history';
import { HistoryItem, HistoryTypes } from '../store/types';
import { setHistoryType } from '../store/actions';

const { historyTypes } = HistoryResources;

const historySortOptions = Object.keys(HistoryTypes).map((historyType) => ({
  label: historyType,
  value: historyType,
}));

const History = () => {
  const {
    state: { history, historyType },
    dispatch,
  } = useContext(AppContext);

  const [historyList, setHistoryList] = useState<HistoryItem[]>(history ?? []);

  const handleSortHistory = useCallback(
    (event: RadioChangeEvent) => {
      const valueSort: HistoryTypes = event.target.value;
      switch (valueSort) {
        case HistoryTypes.ADDED:
          setHistoryList(history.filter(({ type }) => type === HistoryTypes.ADDED));
          break;
        case HistoryTypes.DELETED:
          setHistoryList(history.filter(({ type }) => type === HistoryTypes.DELETED));
          break;
        case HistoryTypes.ALL:
          setHistoryList(history);
          break;
      }

      dispatch(setHistoryType(valueSort));
    },
    [history],
  );

  return (
    <Space direction='vertical' size={32}>
      <Radio.Group
        optionType='button'
        buttonStyle='solid'
        value={historyType}
        onChange={handleSortHistory}
        options={historySortOptions}
      />
      <Row wrap gutter={[32, 24]}>
        {historyList.length > 0 ? (
          historyList.map(({ timeSave, type, element }, index) => (
            <Col key={`${element.id}_${index}`} span={4}>
              <Badge.Ribbon
                text={historyTypes[type]}
                color={type === HistoryTypes.ADDED ? 'green' : 'red'}
              >
                <Card>
                  <Descriptions size='small'>
                    <Descriptions.Item span={24} label='Time'>
                      {timeSave}
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label='ID'>
                      {element.id}
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label='Name'>
                      {element.name}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Row>
    </Space>
  );
};

export default History;
