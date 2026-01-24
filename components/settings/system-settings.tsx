'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Volume2, Zap, Database, Network, Settings as SettingsIcon } from 'lucide-react';

export function SystemSettings() {
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('english');
  const [dataSync, setDataSync] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="space-y-4">
      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Display Settings
          </CardTitle>
          <CardDescription>Customize your interface appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'light', label: 'Light' },
                { id: 'dark', label: 'Dark' },
                { id: 'system', label: 'System' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    theme === t.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Text Size</label>
            <div className="flex items-center gap-4">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className="px-3 py-2 rounded-lg border hover:bg-slate-50 text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm font-medium">High Contrast Mode</span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Language & Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Language & Localization
          </CardTitle>
          <CardDescription>Choose your preferred language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Interface Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi (हिंदी)</option>
              <option value="regional">Regional Languages</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date Format</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Format</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>24-hour</option>
              <option>12-hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>IST (India Standard Time)</option>
              <option>UTC</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Data & Storage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data & Storage
          </CardTitle>
          <CardDescription>Manage data synchronization and storage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto Data Sync</label>
            <button
              onClick={() => setDataSync(!dataSync)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dataSync ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dataSync ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Automatic Backup</label>
            <button
              onClick={() => setAutoBackup(!autoBackup)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoBackup ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoBackup ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-3">Storage Usage</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used</span>
                <span className="font-medium">4.2 GB / 100 GB</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-primary" style={{ width: '4.2%' }} />
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            Manage Storage
          </Button>
        </CardContent>
      </Card>

      {/* Network & Sync */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Network & Performance
          </CardTitle>
          <CardDescription>Optimize connection and performance settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">API Endpoint</label>
            <input
              type="text"
              value="https://api.swasthyaos.in"
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sync Frequency</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
              <option>Hourly</option>
              <option>Manual Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
            <div>
              <p className="text-sm font-medium">Connection Status</p>
              <p className="text-xs text-muted-foreground">Connected • Latency: 45ms</p>
            </div>
            <div className="h-3 w-3 rounded-full bg-success" />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Improve accessibility and user experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">Screen Reader Support</span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm font-medium">Keyboard Navigation</span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Motion Reduction</span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* About & System Info */}
      <Card>
        <CardHeader>
          <CardTitle>About & System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">v1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Build</span>
            <span className="font-medium">b2024.12.15</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">Dec 15, 2024</span>
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Check for Updates
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
