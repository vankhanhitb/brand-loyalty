import React, { useEffect, useState } from 'react';
import {
  Page,
  Layout,
  Card,
  ResourceList,
  ResourceItem,
  Text,
  Modal,
  TextField,
  Select,
  DatePicker,
} from '@shopify/polaris';
import { rewardService } from '../services/api';
import { Reward, RewardType, RewardStatus } from '../types';

const Rewards: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pointsCost: 0,
    type: RewardType.DISCOUNT,
    status: RewardStatus.ACTIVE,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await rewardService.getRewards();
      setRewards(response.data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReward = async () => {
    try {
      await rewardService.createReward(formData);
      setModalOpen(false);
      fetchRewards();
      resetForm();
    } catch (error) {
      console.error('Error creating reward:', error);
    }
  };

  const handleUpdateReward = async () => {
    if (!selectedReward) return;
    try {
      await rewardService.updateReward(selectedReward.id, formData);
      setModalOpen(false);
      fetchRewards();
      resetForm();
    } catch (error) {
      console.error('Error updating reward:', error);
    }
  };

  const handleDeleteReward = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reward?')) return;
    try {
      await rewardService.deleteReward(id);
      fetchRewards();
    } catch (error) {
      console.error('Error deleting reward:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      pointsCost: 0,
      type: RewardType.DISCOUNT,
      status: RewardStatus.ACTIVE,
      startDate: '',
      endDate: '',
    });
    setSelectedReward(null);
  };

  const handleOpenModal = (reward?: Reward) => {
    if (reward) {
      setSelectedReward(reward);
      setFormData({
        name: reward.name,
        description: reward.description,
        pointsCost: reward.pointsCost,
        type: reward.type,
        status: reward.status,
        startDate: reward.startDate || '',
        endDate: reward.endDate || '',
      });
    } else {
      resetForm();
    }
    setModalOpen(true);
  };

  return (
    <Page
      title="Rewards"
      primaryAction={{
        content: 'Add reward',
        onAction: () => handleOpenModal(),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              items={rewards}
              loading={loading}
              renderItem={(reward) => (
                <ResourceItem
                  id={reward.id}
                  onClick={() => handleOpenModal(reward)}
                  accessibilityLabel={`View details for ${reward.name}`}
                  name={reward.name}
                >
                  <Text variant="bodyMd" fontWeight="bold">
                    {reward.description}
                  </Text>
                  <div>Points Cost: {reward.pointsCost}</div>
                  <div>Type: {reward.type}</div>
                  <div>Status: {reward.status}</div>
                </ResourceItem>
              )}
            />
          </Card>
        </Layout.Section>
      </Layout>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedReward ? 'Edit Reward' : 'Add Reward'}
        primaryAction={{
          content: selectedReward ? 'Save' : 'Add',
          onAction: selectedReward ? handleUpdateReward : handleCreateReward,
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
            label="Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            multiline={4}
          />
          <TextField
            label="Points Cost"
            type="number"
            value={formData.pointsCost.toString()}
            onChange={(value) => setFormData({ ...formData, pointsCost: parseInt(value) || 0 })}
          />
          <Select
            label="Type"
            options={Object.values(RewardType).map((type) => ({
              label: type,
              value: type,
            }))}
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value as RewardType })}
          />
          <Select
            label="Status"
            options={Object.values(RewardStatus).map((status) => ({
              label: status,
              value: status,
            }))}
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value as RewardStatus })}
          />
          <DatePicker
            label="Start Date"
            selected={formData.startDate ? new Date(formData.startDate) : undefined}
            onChange={(date) => setFormData({ ...formData, startDate: date.toISOString() })}
          />
          <DatePicker
            label="End Date"
            selected={formData.endDate ? new Date(formData.endDate) : undefined}
            onChange={(date) => setFormData({ ...formData, endDate: date.toISOString() })}
          />
        </Modal.Section>
      </Modal>
    </Page>
  );
};

export default Rewards; 