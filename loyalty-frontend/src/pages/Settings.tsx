import React, { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  Banner,
} from '@shopify/polaris';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    pointsPerDollar: 1,
    minimumPointsRedemption: 100,
    pointsExpiryMonths: 12,
    defaultLanguage: 'en',
    enableNotifications: true,
    enableBirthdayRewards: true,
    enableReferralProgram: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      // TODO: Implement settings save functionality
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <Page title="Settings">
      <Layout>
        <Layout.Section>
          {saved && (
            <Banner
              title="Settings saved"
              status="success"
              onDismiss={() => setSaved(false)}
            />
          )}
          <Card>
            <Card.Section>
              <FormLayout>
                <TextField
                  label="Points per dollar spent"
                  type="number"
                  value={settings.pointsPerDollar.toString()}
                  onChange={(value) =>
                    setSettings({ ...settings, pointsPerDollar: parseInt(value) || 0 })
                  }
                  autoComplete="off"
                />
                <TextField
                  label="Minimum points for redemption"
                  type="number"
                  value={settings.minimumPointsRedemption.toString()}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      minimumPointsRedemption: parseInt(value) || 0,
                    })
                  }
                  autoComplete="off"
                />
                <TextField
                  label="Points expiry (months)"
                  type="number"
                  value={settings.pointsExpiryMonths.toString()}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      pointsExpiryMonths: parseInt(value) || 0,
                    })
                  }
                  autoComplete="off"
                />
                <Select
                  label="Default language"
                  options={[
                    { label: 'English', value: 'en' },
                    { label: 'French', value: 'fr' },
                    { label: 'Spanish', value: 'es' },
                  ]}
                  value={settings.defaultLanguage}
                  onChange={(value) =>
                    setSettings({ ...settings, defaultLanguage: value })
                  }
                />
                <Button primary onClick={handleSave}>
                  Save settings
                </Button>
              </FormLayout>
            </Card.Section>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Feature Flags">
            <Card.Section>
              <FormLayout>
                <Select
                  label="Enable notifications"
                  options={[
                    { label: 'Enabled', value: 'true' },
                    { label: 'Disabled', value: 'false' },
                  ]}
                  value={settings.enableNotifications.toString()}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      enableNotifications: value === 'true',
                    })
                  }
                />
                <Select
                  label="Enable birthday rewards"
                  options={[
                    { label: 'Enabled', value: 'true' },
                    { label: 'Disabled', value: 'false' },
                  ]}
                  value={settings.enableBirthdayRewards.toString()}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      enableBirthdayRewards: value === 'true',
                    })
                  }
                />
                <Select
                  label="Enable referral program"
                  options={[
                    { label: 'Enabled', value: 'true' },
                    { label: 'Disabled', value: 'false' },
                  ]}
                  value={settings.enableReferralProgram.toString()}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      enableReferralProgram: value === 'true',
                    })
                  }
                />
              </FormLayout>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Settings; 