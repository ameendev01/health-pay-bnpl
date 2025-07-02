import React from 'react';
import type { GeneralSettings } from '@/features/settings/types';
import { timezones, dateFormats, currencies } from '@/features/settings/constants';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GeneralSettingsProps {
  generalSettings: GeneralSettings;
  onGeneralSettingsChange: (newSettings: GeneralSettings) => void;
}

export default function GeneralSettings({ generalSettings, onGeneralSettingsChange }: GeneralSettingsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGeneralSettingsChange({
      ...generalSettings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select 
              name="timezone"
              value={generalSettings.timezone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {timezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select 
              name="dateFormat"
              value={generalSettings.dateFormat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {dateFormats.map(df => <option key={df} value={df}>{df}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select 
              name="currency"
              value={generalSettings.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
