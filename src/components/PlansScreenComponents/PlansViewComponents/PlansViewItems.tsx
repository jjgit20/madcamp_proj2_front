import globalStyles from '@src/styles/style';
import {
  commonCountries,
  countryAirports,
  countryCities,
  seasons,
} from '@src/utils/\bselectService';
import {dateFormatter} from '@src/utils/dateFormatter';
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';

import {PersonalPlansDetailedResponseType} from '../../../../types';

const PlansViewItems = ({
  plan,
  type,
}: {
  plan: PersonalPlansDetailedResponseType | null;
  type: string;
}) => {
  const currentList = useMemo(
    () =>
      type === 'needed'
        ? [
            {
              id: 'country',
              name: '나라',
              type: 'select',
              options: commonCountries,
            },
            {
              id: 'city',
              name: '도시',
              type: 'select',
              options: plan?.country
                ? countryCities[plan?.country as keyof typeof countryCities]
                : [],
            },
            {id: 'date', name: '날짜', type: 'date'},
            {id: 'cash', name: '경비', type: 'money'},
          ]
        : [
            {
              id: 'airport',
              name: '공항',
              type: 'select',
              options: plan?.country
                ? countryAirports[plan?.country as keyof typeof countryAirports]
                : [],
            },
            {id: 'season', name: '계절', type: 'select', options: seasons},
            {id: 'topic', name: '주제', type: 'string'},
          ],
    [type, plan?.country],
  );
  return (
    <React.Fragment>
      {currentList &&
        currentList.map(
          (
            {
              id,
              name,
              type,
              options,
            }: {
              id: string;
              name: string;
              type: string;
              options?: {
                label: string;
                value: string;
              }[];
            },
            index: number,
          ) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                alignItems: 'center',
                gap: 15,
              }}>
              <Text
                style={[globalStyles.body1, {width: 50, textAlign: 'right'}]}>
                {name}
              </Text>
              <Text style={[globalStyles.body1]}>
                {id === 'date' &&
                  `${dateFormatter(
                    plan?.startDate as string,
                  )} ~ ${dateFormatter(plan?.endDate as string)}`}
                {id === 'cash' && `${plan?.cash.toLocaleString('ko-KR')} 원`}
                {id !== 'date' &&
                  id !== 'cash' &&
                  (`${plan?.[
                    id as keyof PersonalPlansDetailedResponseType
                  ]}` !== 'null'
                    ? `${plan?.[id as keyof PersonalPlansDetailedResponseType]}`
                    : `#${name}`)}
                {/* {(plan &&
                  `${plan[id as keyof PersonalPlansDetailedResponseType]}`) ||
                  `#${name}`} */}
              </Text>
            </View>
          ),
        )}
    </React.Fragment>
  );
};

export default React.memo(PlansViewItems);
