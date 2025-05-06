import React from 'react';
import {
  Page,
  Layout,
  Card,
  Text,
  ResourceList,
  ResourceItem,
  Thumbnail,
} from '@shopify/polaris';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Customers', value: '1,234' },
    { title: 'Active Rewards', value: '56' },
    { title: 'Points Issued', value: '45,678' },
    { title: 'Points Redeemed', value: '12,345' },
  ];

  const recentCustomers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      points: 500,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      points: 750,
    },
  ];

  return (
    <Page title="Dashboard">
      <Layout>
        {stats.map((stat, index) => (
          <Layout.Section oneThird key={index}>
            <Card>
              <Card.Section>
                <Text variant="headingMd" as="h2">
                  {stat.title}
                </Text>
                <Text variant="headingLg" as="p">
                  {stat.value}
                </Text>
              </Card.Section>
            </Card>
          </Layout.Section>
        ))}

        <Layout.Section>
          <Card title="Recent Customers">
            <ResourceList
              items={recentCustomers}
              renderItem={(customer) => (
                <ResourceItem
                  id={customer.id}
                  name={customer.name}
                  media={
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/person-wearing-white-t-shirt.jpg"
                      alt={customer.name}
                    />
                  }
                  accessibilityLabel={`View details for ${customer.name}`}
                >
                  <Text variant="bodyMd" fontWeight="bold">
                    {customer.name}
                  </Text>
                  <div>{customer.email}</div>
                  <div>{customer.points} points</div>
                </ResourceItem>
              )}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Dashboard; 