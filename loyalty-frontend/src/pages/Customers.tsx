import React, { useEffect, useState } from 'react';
import {
  Page,
  Layout,
  Card,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Text,
  Button,
  Modal,
  TextField,
  Select,
} from '@shopify/polaris';
import { customerService } from '../services/api';
import { Customer, CustomerTier } from '../types';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tier: CustomerTier.BRONZE,
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async () => {
    try {
      await customerService.createCustomer(formData);
      setModalOpen(false);
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleUpdateCustomer = async () => {
    if (!selectedCustomer) return;
    try {
      await customerService.updateCustomer(selectedCustomer.id, formData);
      setModalOpen(false);
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      await customerService.deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      tier: CustomerTier.BRONZE,
    });
    setSelectedCustomer(null);
  };

  const handleOpenModal = (customer?: Customer) => {
    if (customer) {
      setSelectedCustomer(customer);
      setFormData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone || '',
        tier: customer.tier,
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  return (
    <Page
      title="Customers"
      primaryAction={{
        content: 'Add customer',
        onAction: () => handleOpenModal(),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              items={customers}
              loading={loading}
              renderItem={(customer) => (
                <ResourceItem
                  id={customer.id}
                  onClick={() => handleOpenModal(customer)}
                  media={
                    <Thumbnail
                      source="https://burst.shopifycdn.com/photos/person-wearing-white-t-shirt.jpg"
                      alt={customer.firstName}
                    />
                  }
                  accessibilityLabel={`View details for ${customer.firstName} ${customer.lastName}`}
                  name={`${customer.firstName} ${customer.lastName}`}
                >
                  <Text variant="bodyMd" fontWeight="bold">
                    {customer.email}
                  </Text>
                  <div>Points: {customer.points}</div>
                  <div>Tier: {customer.tier}</div>
                </ResourceItem>
              )}
            />
          </Card>
        </Layout.Section>
      </Layout>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedCustomer ? 'Edit Customer' : 'Add Customer'}
        primaryAction={{
          content: selectedCustomer ? 'Save' : 'Add',
          onAction: selectedCustomer ? handleUpdateCustomer : handleCreateCustomer,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(value) => setFormData({ ...formData, firstName: value })}
            autoComplete="given-name"
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(value) => setFormData({ ...formData, lastName: value })}
            autoComplete="family-name"
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            autoComplete="email"
          />
          <TextField
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            autoComplete="tel"
          />
          <Select
            label="Tier"
            options={Object.values(CustomerTier).map((tier) => ({
              label: tier,
              value: tier,
            }))}
            value={formData.tier}
            onChange={(value) => setFormData({ ...formData, tier: value as CustomerTier })}
          />
        </Modal.Section>
      </Modal>
    </Page>
  );
};

export default Customers; 