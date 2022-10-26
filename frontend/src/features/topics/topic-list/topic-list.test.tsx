import React from 'react';
import { render } from '@testing-library/react';
import TopicList from './topic-list';
import { IpublicUser } from 'features/users/types';

export const topicsMock = [
  {
    title: 'test content',
    body: 'test content',
    slug: 'test content',
    ownerId: 'test content',
    createdAt: 'test content',
    updatedAt: 'test content',
    _id: '1',
  },
  {
    title: 'test content2',
    body: 'test content2',
    slug: 'test content2',
    ownerId: 'test content2',
    createdAt: 'test content2',
    updatedAt: 'test content2',
    _id: '1',
  }
]

export const ownersMock: IpublicUser[] = [
  {
    _id: 'test',
    username: 'test content',
    updatedAt: new Date(),
    createdAt: new Date(),
    roles: ['user'],
  },
  {
    _id: 'test content3',
    username: 'test content2',
    updatedAt: new Date(),
    createdAt: new Date(),
    roles: ['user'],
  }
]

test('should render TopicList', () => {
  const { getByText } = render(<TopicList owners={ownersMock} topics={topicsMock} />);

  expect(getByText(topicsMock[0].title))
  expect(getByText(topicsMock[1].title))
  expect(getByText(ownersMock[0].username))
  expect(getByText(ownersMock[1].username))
});
